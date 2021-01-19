const { isCamp } = require('./core');
/* eslint-disable no-plusplus */
/* eslint-disable no-throw-literal */

/**
 * Checks validity of row index
 * @param {Number} r the row index of a coordinate pair
 * @returns {boolean} whether the row index is within board bounds
 * @see isValidRow
 */

export const isValidRow = (r) => r >= 0 && r < 12;

/**
 * Checks validity of column index
 * @param {Number} c the column index of a coordinate pair
 * @returns {boolean} whether the column index is within board bounds
 * @see isValidCol
 */

export const isValidCol = (c) => c >= 0 && c < 5;

/**
 * Checks validity of coordinate pair as piece destination
 * @param {Object} board the Board object as defined in the backend Schema
 * @param {Number} r the row index of the target coordinate pair
 * @param {Number} c the column index of the target coordinate pair
 * @param {Number} affiliation 0 for host, increments by 1 for additional players
 * @returns {boolean} whether the target destination is valid
 * @see isValidDestination
 */

export const isValidDestination = (board, r, c, affiliation) =>
    isValidRow(r) && isValidCol(c) && board[r][c].affiliation !== affiliation;

/**
 * Checks whether the space is a railroad tile
 * @param {Number} r the row of the target coordinate pair
 * @param {Number} c the column of the target coordinate pair
 * @returns {boolean} whether the space is a railroad tile
 */

export const isRailroad = (r, c) => {
    if (!isValidRow(r) || !isValidCol(c)) {
        return false;
    }
    if (c === 0 || c === 4) {
        return r > 0 && r < 12;
    }
    return r === 1 || r === 5 || r === 6 || r === 10;
};

/**
 * Gets a list of possible positions the piece at a given coordinate pair can travel to
 * @param {Object} board the Board object as defined in the backend Schema
 * @param {Number} r the row of the source coordinate pair
 * @param {Number} c the column of the source coordinate pair
 * @param {Array} adjList a list of lists representing the graph of duplex tile connections
 * @param {Number} affiliation 0 for host, increments by 1 for additional players
 * @returns {Array} list of positions that the piece may travel to during its turn
 * @see getSuccessors
 */

export function getSuccessors(board, adjList, r, c, affiliation) {
    // validate the board
    if (board.length !== 12) {
        throw 'Invalid number of rows';
    }

    if (!board.every((row) => row.length === 5)) {
        throw 'Invalid number of columns';
    }

    // validate from
    if (!isValidRow(r)) {
        throw 'Invalid x';
    }

    if (!isValidCol(c)) {
        throw 'Invalid y';
    }

    const piece = board[r][c];

    // get the piece type
    if (piece == null || piece === 'landmine' || piece === 'flag') {
        return [];
    }

    const railroadMoves = new Set();
    if (piece === 'engineer') {
        if (isRailroad(r, c)) {
            // perform dfs to find availible moves
            const stack = [[r, c]];
            const visited = new Set();
            const directions = [
                [-1, 0],
                [0, -1],
                [1, 0],
                [0, 1],
            ];

            while (stack) {
                let [curRow, curCol] = stack.pop();

                visited.add([curRow, curCol]);

                if (isValidDestination(board, curRow, curCol, affiliation)) {
                    // don't add the first location
                    if (!(curRow === r && curCol === c)) {
                        railroadMoves.add(JSON.stringify([curRow, curCol]));
                    }
                    directions.forEach((incRow, incCol) => {
                        const neighbor = [curRow + incRow, curCol, incCol];
                        if (!visited.has(neighbor)) {
                            stack.push(neighbor);
                        }
                    });
                }
            }
        }
    } else if (isRailroad(r, c)) {
        const directions = [
            [-1, 0],
            [0, -1],
            [1, 0],
            [0, 1],
        ];
        directions.forEach((direction) => {
            const [incRow, incCol] = direction;

            let curRow = r + incRow;
            let curCol = c + incCol;
            while (isValidDestination(board, curRow, curCol, affiliation)) {
                railroadMoves.add(JSON.stringify([curRow, curCol]));
                curRow += incRow;
                curCol += incCol;
            }
        });
    }
    const jsonMoves = new Set([
        ...railroadMoves,
        ...adjList.get(JSON.stringify([r, c])),
    ]);
    return [...jsonMoves].map((m) => JSON.parse(m));
}

/**
 * Generates the adjacency graph for a two player Luzhanqi game
 * @returns {Array<Array>} list of lists indicating duplex tile connections
 * @see generateAdjList
 */
// note that the coordinates are stored in a JSON format
export const generateAdjList = () => {
    const adjList = new Map();
    for (let originR = 0; originR < 12; originR++) {
        for (let originC = 0; originC < 5; originC++) {
            const connections =
                adjList.get(JSON.stringify([originR, originC])) || new Set();

            // add up/down and left/right connections
            const directions = [
                [-1, 0],
                [0, -1],
                [1, 0],
                [0, 1],
            ];

            if (isCamp(originR, originC)) {
                // add diagonal connections
                directions.push(
                    ...[
                        [-1, -1],
                        [1, -1],
                        [-1, 1],
                        [1, 1],
                    ]
                );
            }

            directions.forEach(([incR, incC]) => {
                const destR = originR + incR;
                const destC = originC + incC;
                if (isValidRow(destR) && isValidCol(destC)) {
                    connections.add(JSON.stringify([destR, destC]));
                    // set reverse direction if center piece
                    if (isCamp(originR, originC)) {
                        if (!adjList.has(JSON.stringify([destR, destC]))) {
                            adjList.set(
                                JSON.stringify([destR, destC]),
                                new Set()
                            );
                        }
                        adjList
                            .get(JSON.stringify([destR, destC]))
                            .add(JSON.stringify([originR, originC]));
                    }
                }
            });

            adjList.set(JSON.stringify([originR, originC]), connections);
        }
    }

    // console.log(Object.fromEntries(adjList));
    return adjList;
};

/**
 *
 * @param {Object} board the Board object as defined in the backend Schema
 * @param {Number} r the row of the target coordinate pair
 * @param {Number} c the column of the target coordinate pair
 * @param {*} piece a Piece object as defined in Piece.js
 */
export const placePiece = (board, r, c, piece) => {
    if (!isValidRow(r) || !isValidCol(c)) {
        throw 'Invalid position passed';
    }
    return board.map((row, i) =>
        row.map((cell, j) => (i === r && j === c ? piece : cell))
    );
};

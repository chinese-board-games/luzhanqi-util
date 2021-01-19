/**
 * Checks whether a given space is a camp tile
 * @param {Number} r - the row index of the target coordinate pair
 * @param {Number} c - the column index of the target coordinate pair
 * @returns {boolean} - whether the tile is a camp
 * @see isCamp
 
 */
export const isCamp = (r, c) =>
    ((c === 1 || c === 3) && (r === 2 || r === 4 || r === 7 || r === 9)) ||
    (c === 2 && (r === 3 || r === 8));

/**
 *
 * @param {Number} r - the row index of the target coordinate pair
 * @param {Number} c - the column index of the target coordinate pair
 * @returns {boolean} - whether the tile is a HQ
 * @see isHQ
 */
export const isHQ = (r, c) => (c == 1 || c == 3) && (r == 0 || r == 11);

export const iterBoard = (board, callback) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            callback(board[i][j], i, j);
        }
    }
};

export const mapBoard = (board, callback) => {
    const newBoard = [];
    for (let i = 0; i < board.length; i++) {
        const row = [];
        for (let j = 0; j < board[i].length; j++) {
            row.push(callback(board[j][i], j, i));
        }
        newBoard.push(row);
    }
    return newBoard;
};

/**
 * Checks whether a given space is a camp tile
 * @param {Number} x - the column of the target coordinate pair
 * @param {Number} y - the row of the target coordinate pair
 * @returns {boolean} - whether the tile is a camp
 * @see isCamp
 
 */
export const isCamp = (x, y) =>
    ((x === 1 || x === 3) && (y === 2 || y === 4 || y === 7 || y === 9)) ||
    (x === 2 && (y === 3 || y === 8))

/**
 *
 * @param {Number} x - the column of the target coordinate pair
 * @param {Number} y - the row of the target coordinate pair
 * @returns {boolean} - whether the tile is a HQ
 * @see isHQ
 */
export const isHQ = (x, y) => (x == 1 || x == 3) && (y == 0 || y == 11)

export const iterBoard = (board, callback) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            callback(board[i][j], i, j)
        }
    }
}

export const mapBoard = (board, callback) => {
    const newBoard = []
    for (let i = 0; i < board.length; i++) {
        const row = []
        for (let j = 0; j < board[i].length; j++) {
            row.push(callback(board[j][i], j, i))
        }
        newBoard.push(row)
    }
    return newBoard
}

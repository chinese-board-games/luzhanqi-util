import { pieces } from './piece';
import { isCamp } from './getSuccessors';
import { isHQ } from './core';

export default function validateSetup(halfBoard, isTopHalf = true) {

    // flip the board of neccessary
    if (!isTopHalf) {
        halfBoard = [...halfBoard].reverse();
    }

    // validate shape
    if (halfBoard.length != 6) {
        return false;
    }

    for (const row of halfBoard) {
        if (row.length != 5) {
            return false;
        }
    }

    const pieceCount = name => {
        return halfBoard.filter(p => p.name === name).length;
    }

    // validate piece counts
    for (const [k, v] of Object.entries(pieces)) {
        if (v.count !== pieceCount(k)) {
            return false;
        }
    }

    // validate camps are empty and non-camp positions are filled
    iterBoard(halfBoard, (piece, x, y) => {
        if ((isCamp(x, y) && piece != null) || !isCamp(x, y) && piece == null) {
            return false;
        }
    });
    
    // validate the flag is in HQ
    iterBoard(halfBoard, (piece, x, y) => {
        if (piece?.name == 'flag' && !isHQ(x, y)) {
            return false;
        }
    });

    // validate landmine in the last two rows
    iterBoard(halfBoard, (piece, _, y) => {
        if (piece?.name == 'landmine' && y > 1) {
            return false;
        }
    });

    // validate bomb is not in the first row
    iterBoard(halfBoard, (piece, _, y) => {
        if (piece?.name == 'bomb' && y == 5) {
            return false;
        }
    });
}

const iterBoard = (board, callback) => {
    for (let i = 0; i < halfBoard.length; i++) {
        for (let j = 0; j < halfBoard[i].length; j++) {
            callback(board[i][j], i, j);
        }
    }
};

const mapBoard = (board, callback) => {
    const newBoard = [];
    for (let i = 0; i < halfBoard.length; i++) {
        const row = [];
        for (let j = 0; j < halfBoard[i].length; j++) {
            row.push(callback(board[j][i], j, i));
        }
        newBoard.push(row);
    }
    return newBoard;
};
export const deepCloneBoard = (board: (number | null)[][]) => [
    [...board[0]],
    [...board[1]],
    [...board[2]],
    [...board[3]],
    [...board[4]],
    [...board[5]],
];

export const generateNewBoard = (): (number | null)[][] => [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
];

const checkVertical = (board: (number | null)[][]): [number, number][] | undefined => {
    // Check only if row is 3 or greater
    for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            if (board[r][c]) {
                if (
                    board[r][c] === board[r - 1][c] &&
                    board[r][c] === board[r - 2][c] &&
                    board[r][c] === board[r - 3][c]
                ) {
                    return [
                        [r, c],
                        [r - 1, c],
                        [r - 2, c],
                        [r - 3, c],
                    ];
                }
            }
        }
    }
};

const checkHorizontal = (board: (number | null)[][]): [number, number][] | undefined => {
    // Check only if column is 3 or less
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c]) {
                if (
                    board[r][c] === board[r][c + 1] &&
                    board[r][c] === board[r][c + 2] &&
                    board[r][c] === board[r][c + 3]
                ) {
                    return [
                        [r, c],
                        [r, c + 1],
                        [r, c + 2],
                        [r, c + 3],
                    ];
                }
            }
        }
    }
};

const checkDiagonalRight = (board: (number | null)[][]): [number, number][] | undefined => {
    // Check only if row is 3 or greater AND column is 3 or less
    for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c]) {
                if (
                    board[r][c] === board[r - 1][c + 1] &&
                    board[r][c] === board[r - 2][c + 2] &&
                    board[r][c] === board[r - 3][c + 3]
                ) {
                    return [
                        [r, c],
                        [r - 1, c + 1],
                        [r - 2, c + 2],
                        [r - 3, c + 3],
                    ];
                }
            }
        }
    }
};

const checkDiagonalLeft = (board: (number | null)[][]): [number, number][] | undefined => {
    // Check only if row is 3 or greater AND column is 3 or greater
    for (let r = 3; r < 6; r++) {
        for (let c = 3; c < 7; c++) {
            if (board[r][c]) {
                if (
                    board[r][c] === board[r - 1][c - 1] &&
                    board[r][c] === board[r - 2][c - 2] &&
                    board[r][c] === board[r - 3][c - 3]
                ) {
                    return [
                        [r, c],
                        [r - 1, c - 1],
                        [r - 2, c - 2],
                        [r - 3, c - 3],
                    ];
                }
            }
        }
    }
};

export const checkDraw = (board: (number | null)[][]) => {
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            if (board[r][c] === null) {
                return null;
            }
        }
    }
    return 'draw';
};

export const checkForWin = (board: (number | null)[][]) => {
    return (
        checkVertical(board) ||
        checkDiagonalRight(board) ||
        checkDiagonalLeft(board) ||
        checkHorizontal(board)
    );
};

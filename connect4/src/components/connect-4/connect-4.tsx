import classNames from 'classnames';
import styles from './connect-4.module.scss';
import { Board } from '../board/board';
import { checkDraw, checkForWin, deepCloneBoard, generateNewBoard } from './gameUtils';
import { useReducer, useState } from 'react';
import { MessageBoard, MessageType } from '../message-board/message-board';

export interface Connect4Props {
    className?: string;
}

interface GameState {
    player1: number;
    player2: number;
    currentPlayer: number;
    ghostPlayer: number;
    board: (number | null)[][];
    gameOver: boolean;
    message: MessageType;
}

interface Action {
    type: 'newGame' | 'togglePlayer' | 'hover' | 'endGame' | 'updateMessage';
    message?: MessageType;
    nextPlayer?: number;
    board?: (number | null)[][];
}

const initialGameState: GameState = {
    player1: 1,
    player2: 2,
    currentPlayer: 1,
    ghostPlayer: 3,
    board: generateNewBoard(),
    gameOver: false,
    message: 'newgame',
};

const gameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case 'newGame':
            return {
                ...initialGameState,
				message: "newgame",
                board: generateNewBoard(),
            };
        case 'togglePlayer':
            if (!action.nextPlayer || !action.board) {
                throw Error('Missing params');
            }
            return {
                ...state,
                currentPlayer: action.nextPlayer,
				message: "",
                board: action.board,
            };
        case 'hover':
            if (!action.board) {
                throw Error('Missing params');
            }
            return {
                ...state,
                board: action.board
            }
        case 'endGame':
            if (!action.message || !action.board) {
                throw Error('Missing params');
            }
            return {
                ...state,
                gameOver: true,
                message: action.message,
                board: action.board,
            };
        case 'updateMessage':
            if (!action.message) {
                throw Error('Missing params');
            }
            return {
                ...state,
                message: action.message,
            };
        default:
            throw Error(`Action "${action.type}" is not a valid action.`);
    }
};

export const Connect4 = ({ className }: Connect4Props) => {
    const [gameState, dispatchGameState] = useReducer(gameReducer, initialGameState);
    const [highlights, setHighlights] = useState<[number, number][]>([]);

    const removeGhostCoins = (board: (number | null)[][]) => {
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                board[r][c] = board[r][c] === gameState.ghostPlayer
                    ? null
                    : board[r][c];
            }
        }

        return board
    }

    const placeCoin = (c: number, player: number): [boolean, (number | null)[][]] => {
        let board = deepCloneBoard(gameState.board);
        board = removeGhostCoins(board);
        let played = false;

        for (let r = 5; r >= 0; r--) {
            if (!board[r][c] || board[r][c] === gameState.ghostPlayer) {
                board[r][c] = player;
                played = true;
                break;
            }
        }

        return [played, board];
    }

    const hover = (c: number) => {
        if (gameState.gameOver) {
            return;
        }

        let [played, board] = placeCoin(c, gameState.ghostPlayer);

        dispatchGameState({ type: 'hover', board });
    }

    const makeMove = (c: number) => {
        if (gameState.gameOver) { return; }

        let [played, board] = placeCoin(c, gameState.currentPlayer);
        if (!played) {
            return;
        }

        const nextPlayer =
            gameState.currentPlayer === gameState.player1
                ? gameState.player2
                : gameState.player1

        const win = checkForWin(board);
        if (win !== undefined) {
            setHighlights(win);
            dispatchGameState({ type: 'endGame', board, message: "over" });
            return;
        }
        if (checkDraw(board)) {
            dispatchGameState({ type: 'endGame', board, message: "draw" });
            return;
        }

        dispatchGameState({ type: 'togglePlayer', nextPlayer, board })
    };

    return (
        <div className={classNames(styles.root, className)}>
            <MessageBoard
                players={['Red', 'Yellow']}
                state={{ 
                    playerTurn: gameState.currentPlayer - 1,
                    gameOver: gameState.gameOver,
                    message: gameState.message
                }}
            />

            <Board
                board={gameState.board}
                highlights={highlights}
                play={makeMove}
                hover={hover}
                theme='light'
            />
        </div>
    );
};

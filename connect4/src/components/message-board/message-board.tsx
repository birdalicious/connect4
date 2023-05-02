import classNames from 'classnames';
import styles from './message-board.module.scss';
import corners from '../pixel-corners.module.scss'

export interface MessageBoardProps {
    className?: string;
    players: [string, string];
    player?: number;
    state: GameState;
}
export type MessageType = "" | "draw" | "over" | "abandoned"

interface GameState {
    playerTurn: number;
    gameOver: boolean;
    message: "" | "over" | "draw" | "abandoned";
}

export const MessageBoard = ({ className,  player, players, state }: MessageBoardProps) => {

    let self = player !== null && state.playerTurn === player ? true : false;

    return <div className={classNames(styles.root, corners['pixel-corners'], className)}>
        {!state.gameOver ? `${self? 'Your' : players[state.playerTurn] + "'s"} Turn` : null}
        {state.gameOver && state.message === "over" ? `${self? 'You' : players[state.playerTurn]} Won!` : null}
        {state.gameOver && state.message === "draw" ? `Draw...` : null}
    </div>;
};

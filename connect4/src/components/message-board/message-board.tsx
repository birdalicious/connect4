import classNames from 'classnames';
import styles from './message-board.module.scss';
import corners from '../pixel-corners.module.scss'
import { PixelBoard } from '../pixel-board/pixel-board';

export interface MessageBoardProps {
    className?: string;
    players: [string, string];
    player?: number;
    state: GameState;
}
export type MessageType = "" | "newgame" | "draw" | "over" | "abandoned"

interface GameState {
    playerTurn: number;
    gameOver: boolean;
    message: MessageType;
}

const getTextArea = (self: boolean, players: [string, string], state: GameState) => {
    if(!state.gameOver) {
        if(state.message) {
            return <PixelBoard>Ready?...</PixelBoard>
        }
        return <PixelBoard>{`${self? 'Your' : players[state.playerTurn] + "'s"} Turn`}</PixelBoard>
    }

    switch (state.message) {
        case "over":
            return <PixelBoard>{`${self? 'You' : players[state.playerTurn]} Won!`}</PixelBoard>
        case "draw":
            return <PixelBoard>Draw...</PixelBoard>
    }
}

export const MessageBoard = ({ className,  player, players, state }: MessageBoardProps) => {

    let self = player !== null && state.playerTurn === player ? true : false;

    return <div className={classNames(styles.root, className)}>
        {getTextArea(self, players, state)}
    </div>;
};

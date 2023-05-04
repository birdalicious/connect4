import classNames from 'classnames';
import styles from './lobby.module.scss';
import { PixelBoard } from '../pixel-board/pixel-board';
import { PixelInput } from '../pixel-input/pixel-input';

interface LobbyProps {
    className?: string;
}

export const Lobby = ({  className } : LobbyProps) => {
    return <div className={classNames(styles.root, className)}>
        <PixelBoard
            xlarge
            className={styles.rooms}
            >
                <h2>Open Rooms</h2>
                <h5>Click a room to join</h5>
                <PixelBoard
                    xlarge
                    theme='recessed'>
                    <div>
                        <PixelBoard clickable >
                            Hello
                        </PixelBoard>
                        <PixelBoard clickable>
                            Hello
                        </PixelBoard>
                        
                    </div>
                </PixelBoard>
        </PixelBoard>

        <div className={styles.newRoom}>
            <PixelBoard theme='dark' clickable>Create Room</PixelBoard>
            <PixelInput 
                className={styles.newRoomInput}
                placeholder='Enter Room Name'/>
        </div>
    </div>
}
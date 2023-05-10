import classNames from 'classnames';
import styles from './lobby.module.scss';
import { PixelBoard } from '../pixel-board/pixel-board';
import { PixelInput } from '../pixel-input/pixel-input';
import { Connect4SRContext } from '../../App';
import { useEffect, useState } from 'react';

interface LobbyProps {
    className?: string;
    joinRoom: (room: string) => void;
}

export const Lobby = ({  className, joinRoom } : LobbyProps) => {
    const [lobbies, setLobbies] = useState<string[]>([]);
    const [createLobby, setCreateLobby] = useState("");

    Connect4SRContext.useSignalREffect("Lobbies", (lobbies) => {
        setLobbies(lobbies);
        console.log(lobbies);
    }, [lobbies]);

    useEffect(()=> {
        Connect4SRContext.invoke("ListLobbies");
    }, [])

    const createRoomSubmit = () => {
        if(!isEmptyOrSpaces(createLobby)) {
            joinRoom(createLobby);
        }
    }

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
                        
                    {!lobbies.length ? <h3>{"No rooms"}</h3>: null}

                    <div>
                        {lobbies.map((l, i) => <PixelBoard key={i} onClick={() => joinRoom(l)}>{l}</PixelBoard>)}
                    </div>
                </PixelBoard>
        </PixelBoard>

        <div className={styles.newRoom}>
            <PixelBoard theme='dark' onClick={createRoomSubmit}>Create Room</PixelBoard>
            <PixelInput 
                className={styles.newRoomInput}
                placeholder='Enter Room Name'
                text={createLobby}
                setText={setCreateLobby}/>
        </div>
    </div>
}

function isEmptyOrSpaces(str: string){
    return str === null || str.match(/^ *$/) !== null;
}
import { useState } from 'react';
import classNames from 'classnames';
import styles from './App.module.scss';
import { Connect4 } from './components/connect-4/connect-4';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GameSelect } from './components/game-select/game-select';
import { PixelBoard } from './components/pixel-board/pixel-board';
import { EnterName } from './components/enter-name/enter-name';
import { Online } from './components/online/online';
import { createSignalRContext } from 'react-signalr';

export const Connect4SRContext = createSignalRContext();

function App() {
    const [count, setCount] = useState(0);

    return (
        <Connect4SRContext.Provider
            url={`https://${window.location.hostname}:7046/connect4`}
            onOpen={() => {
                console.log('open');
            }}>
            <div className={styles.App}>
                <BrowserRouter>
                    <Routes>
                    <Route path="" element={<GameSelect />} />
                        <Route path="/1-player" element={<PixelBoard>Oopsie Doopsie looks like this doesn't work loser</PixelBoard>}/>
                        <Route path="/2-player" element={<Connect4 />} />
                        <Route path="/online" element={<Online />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Connect4SRContext.Provider>
    );
}

export default App;

import { useState } from 'react';
import classNames from 'classnames';
import styles from './App.module.scss';
import { Connect4 } from './components/connect-4/connect-4';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GameSelect } from './components/game-select/game-select';
import { TextArea } from './components/text-area/text-area';
import { EnterName } from './components/enter-name/enter-name';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className={styles.App}>
            <BrowserRouter>
                <Routes>
                <Route path="" element={<GameSelect />} />
                    <Route path="/1-player" element={<TextArea text="Oopsie Doopsie looks like this doesn't work loser"  />}/>
                    <Route path="/2-player" element={<Connect4 />} />
                    <Route path="/online" element={<EnterName  name={null} setName={() => null}/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

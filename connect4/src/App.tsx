import { useState } from 'react';
import classNames from 'classnames';
import styles from './App.module.scss';
import { Connect4 } from './components/connect-4/connect-4';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className={styles.App}>
            <Connect4 />
        </div>
    );
}

export default App;

import classNames from 'classnames';
import styles from './enter-name.module.scss'
import boardStyles from '../pixel-board/pixel-board.module.scss';
import corners from '../pixel-corners.module.scss';
import { PixelBoard } from '../pixel-board/pixel-board';
import { PixelInput } from '../pixel-input/pixel-input';

export interface EnterNameProps {
    className?: string;
    name: string | undefined;
    setName: (name: string) => void;
    onSubmit: () => void;
}

export const EnterName = ({ className, name, setName, onSubmit }: EnterNameProps) => {
    return <div className={styles.root}>
        <PixelBoard large>
            <h3>Enter name</h3>
            <PixelInput placeholder='Your Name' text={name} setText={setName} />
        </PixelBoard>
        
        <div className={styles['play-button']}>
            <PixelBoard onClick={onSubmit}>Play!</PixelBoard>
        </div>
    </div>;
};

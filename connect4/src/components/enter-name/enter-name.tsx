import classNames from 'classnames';
import styles from './enter-name.module.scss'
import boardStyles from '../text-area/text-area.module.scss';
import corners from '../pixel-corners.module.scss';
import { TextArea } from '../text-area/text-area';

export interface EnterNameProps {
    className?: string;
    name: string | null;
    setName: (name: string) => void;
}

export const EnterName = ({ className, name, setName }: EnterNameProps) => {
    return <>
        <div className={classNames(boardStyles.root, corners['pixel-corners'], className)} data-size="large">
            <h3>Enter name</h3>

            <div className={corners['pixel-corners--wrapper']}>
                <input
                    type="text"
                    placeholder="Your Name"
                    className={classNames(boardStyles.root, styles.input, corners['pixel-corners']) }
                    data-theme="recessed"
                    value={name ?? ""}
                    onChange={e => setName(e.target.value)} 
                />
            </div>
        </div>
        
        <div className={styles['play-button']}>
            <TextArea text="Play!" />
        </div>
    </>;
};

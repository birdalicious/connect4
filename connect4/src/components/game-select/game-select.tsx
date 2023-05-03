import classNames from 'classnames';
import styles from './game-select.module.scss';
import { TextArea } from '../text-area/text-area';
import { Link } from 'react-router-dom';

export interface GameSelectProps {
    className?: string;
}

export const GameSelect = ({ className }: GameSelectProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <Link to="/1-player">
                <TextArea text="1-Player" large={true} />
            </Link>
            <Link to="/2-player">
                <TextArea text="2-Player" large={true} />
            </Link>
            <TextArea text="Online" large={true} />
        </div>
    );
};

import classNames from 'classnames';
import styles from './game-select.module.scss';
import { PixelBoard } from '../pixel-board/pixel-board';
import { Link } from 'react-router-dom';

export interface GameSelectProps {
    className?: string;
}

export const GameSelect = ({ className }: GameSelectProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <Link to="/1-player">
                <PixelBoard clickable large>1-Player</PixelBoard>
            </Link>
            <Link to="/2-player">
                <PixelBoard clickable large>2-Player</PixelBoard>
            </Link>
            <Link to="/online">
                <PixelBoard clickable large>Online</PixelBoard>
            </Link>
        </div>
    );
};

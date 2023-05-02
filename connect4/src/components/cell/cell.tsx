import classNames from 'classnames';
import styles from './cell.module.scss';

export interface CellProps {
    className?: string;
    coin?: string;
    highlight: boolean;
    dropped: boolean;
    play: () => void;
    hover: () => void;
    skin: string;
}

export const Cell = ({ className, coin, highlight, dropped, play, hover, skin }: CellProps) => {
    return <div 
        className={classNames(styles.root, className)}
        onClick={play}
        onMouseEnter={hover}
        data-skin={skin}
        >
        {coin? 
            <div 
            className={classNames(
                styles.coin,
                styles[coin],
                {
                    [styles.dropped]: dropped
                }
            )}
            >

            </div>
         : null}

        {highlight?
            <div className={classNames(
                styles.coin,
                styles.highlight)}>
            </div>
        : null}
    </div>;
};

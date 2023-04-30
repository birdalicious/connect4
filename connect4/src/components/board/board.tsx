import classNames from 'classnames';
import styles from './board.module.scss';
import corners from '../pixel-corners.module.scss'
import { Cell } from '../cell/cell'

export interface BoardProps {
    className?: string;
    board: (number | null)[][];
}

export const Board = ({ className, board }: BoardProps) => {
    return <div className={classNames(styles.root, corners['pixel-corners'], className)}>
        {board.map((row, rowIndex) => {
           return row.map((cell, columnIndex) => {
            let colour = cell === 0
                ? "red"
                : cell === 1
                ? "yellow"
                : cell === 2
                ? "ghost"
                : undefined 
            return <Cell coin={colour} highlight={false} dropped={true}/>
           })
        })}
    </div>;
};

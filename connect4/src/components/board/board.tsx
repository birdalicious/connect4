import classNames from 'classnames';
import styles from './board.module.scss';
import corners from '../pixel-corners.module.scss';
import { Cell } from '../cell/cell';

export interface BoardProps {
    className?: string;
    board: (number | null)[][];
    highlights: [number, number][];
    play: (column: number) => void;
    hover: (column: number) => void;
    skin?: "dogs" | "";
    theme?: "light" | "dark";
}

export const Board = ({ className, board, play, hover, skin, theme, highlights }: BoardProps) => {

    const isHighlighted = (row:number, column:number) => {
        let show = false
        highlights.forEach((highlight) => {
            if(row === highlight[0] && column == highlight[1]) {
                show = true;
                return;
            }
        });
        
        return show;
    }

    return (
        <div 
            className={classNames(styles.root, corners['pixel-corners'], className)}
            data-background={theme ?? "light"}
            onMouseLeave={() => hover(-1)}
            >
            {board.map((row, rowIndex) => {
                return row.map((cell, columnIndex) => {
                    let colour =
                        cell === 1
                            ? 'red'
                            : cell === 2
                            ? 'yellow'
                            : cell === 3
                            ? 'ghost'
                            : undefined;

                    return (
                        <Cell
                            key={`${rowIndex} ${columnIndex}`}
                            coin={colour}
                            highlight={isHighlighted(rowIndex, columnIndex)}
                            dropped={cell !== 3}
                            play={() => play(columnIndex)}
                            hover={() => hover(columnIndex)}
                            skin={skin ?? ""}
                        />
                    );
                });
            })}
        </div>
    );
};

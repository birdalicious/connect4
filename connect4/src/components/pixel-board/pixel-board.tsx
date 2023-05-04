import classNames from 'classnames';
import styles from './pixel-board.module.scss';
import corners from '../pixel-corners.module.scss'
import { Children, ReactNode } from 'react';

export interface PixelBoardProps {
    className?: string;
    children: ReactNode;
    theme?: "light" | "dark" | "recessed";
    large?: boolean;
    xlarge?: boolean;
    clickable?: boolean; 
    onClick?: () => void;
}

export const PixelBoard = ({ className, children, theme, large, xlarge, clickable, onClick }: PixelBoardProps) => {
    let size = "normal";
    if(large) {
        size = "large";
    } else if(xlarge) {
        size = "xlarge";
    }

    return <div
        className={classNames(
            styles.root,
            corners['pixel-corners'],
            className)
            }
        onClick={onClick}
        data-clickable={onClick != null || clickable}
        data-size={size}
        data-theme={theme? theme : "light"}
        >
            {children}
        </div>;
};

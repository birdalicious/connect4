import classNames from 'classnames';
import styles from './text-area.module.scss';
import corners from '../pixel-corners.module.scss'

export interface TextAreaProps {
    className?: string;
    text: string;
    theme?: "light" | "dark" | "recessed";
    large?: boolean;
}

export const TextArea = ({ className, text, theme, large }: TextAreaProps) => {
    return <div className={classNames(styles.root, corners['pixel-corners'], className)} data-size={large? "large" : "normal"} data-theme={theme? theme : "light"}>
            {text}
        </div>;
};

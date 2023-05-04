import styles from './pixel-input.module.scss';
import boardStyles from '../pixel-board/pixel-board.module.scss';
import corners from '../pixel-corners.module.scss';
import classNames from 'classnames';

interface PixelInputProps {
    className?: string;
    placeholder?: string;
    text?: string;
    setText: (text: string) => void
}

export const PixelInput = ({className, placeholder, text, setText} : PixelInputProps) => {
    return <div className={classNames(styles.root, corners['pixel-corners--wrapper'], className)}>
        <input
            type="text"
            placeholder={placeholder}
            className={classNames(boardStyles.root, corners['pixel-corners']) }
            data-theme="recessed"
            value={text ?? ""}
            onChange={e => setText(e.target.value)} 
        />
    </div>
}
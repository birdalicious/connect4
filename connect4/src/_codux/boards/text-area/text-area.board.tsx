import { createBoard } from '@wixc3/react-board';
import { PixelBoard } from '../../../components/pixel-board/pixel-board';

export default createBoard({
    name: 'TextArea',
    Board: () => <PixelBoard text="TextArea" />,
});

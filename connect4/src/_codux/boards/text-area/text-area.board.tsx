import { createBoard } from '@wixc3/react-board';
import { TextArea } from '../../../components/text-area/text-area';

export default createBoard({
    name: 'TextArea',
    Board: () => <TextArea text="TextArea" />,
});

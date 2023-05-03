import { createBoard } from '@wixc3/react-board';
import { EnterName } from '../../../components/enter-name/enter-name';

export default createBoard({
    name: 'EnterName',
    Board: () => <EnterName />
});

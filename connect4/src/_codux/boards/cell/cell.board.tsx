import { createBoard } from '@wixc3/react-board';
import { Cell } from '../../../components/cell/cell';

export default createBoard({
    name: 'Cell',
    Board: () => <Cell highlight={false} coin="red" play={() => null} hover={() => null} dropped={false}/>,
    environmentProps: {
        canvasWidth: 50,
        canvasHeight: 50,
    },
});

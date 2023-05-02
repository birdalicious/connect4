import { createBoard } from '@wixc3/react-board';
import { Connect4 } from '../../../components/connect-4/connect-4';

export default createBoard({
    name: 'Connect4',
    Board: () => <Connect4 />,
    environmentProps: {
        canvasWidth: 500,
        canvasHeight: 500,
    },
});

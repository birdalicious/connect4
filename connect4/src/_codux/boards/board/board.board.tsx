import { createBoard } from '@wixc3/react-board';
import { Board } from '../../../components/board/board';

export default createBoard({
    name: 'Board',
    Board: () => (
        <Board
            board={[
                [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
            ]}
        />
    ),
    environmentProps: {
        canvasWidth: 500,
    },
});

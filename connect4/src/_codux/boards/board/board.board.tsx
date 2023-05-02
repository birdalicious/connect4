import { createBoard } from '@wixc3/react-board';
import { Board } from '../../../components/board/board';

export default createBoard({
    name: 'Board',
    Board: () => (
        <Board
            board={[
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
            ]}
            highlights={[]}
            play={() => null}
            hover={() => null}
        />
    ),
    environmentProps: {
        canvasWidth: 500,
    },
});

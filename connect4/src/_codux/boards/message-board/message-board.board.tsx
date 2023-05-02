import { createBoard } from '@wixc3/react-board';
import { MessageBoard } from '../../../components/message-board/message-board';

export default createBoard({
    name: 'MessageBoard',
    Board: () => (
        <MessageBoard
            players={['Yellow', 'Red']}
            state={{
                playerTurn: 0,
                gameState: 'playing',
            }}
            player={0}
        />
    ),
});

import { createBoard } from '@wixc3/react-board';
import { GameSelect } from '../../../components/game-select/game-select';

export default createBoard({
    name: 'GameSelect',
    Board: () => <GameSelect />
});

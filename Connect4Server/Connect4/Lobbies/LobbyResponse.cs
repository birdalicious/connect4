using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connect4.Lobbies
{
    public enum LobbyResponse
    {
        Joined,
        Full,
        AlreadyInLobby,
        NotInLobby,
        Left,
        Created,
        Removed
    }
}

using Connect4.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connect4.Lobbies
{
    public class Lobby
    {
        public string LobbyId { get; set; }
        public List<User> Players { get; set; } = new();
        public IConnect4 Game { get; set; } = new Connect4();
        public bool IsFull => Players.Count == 2;
        public bool GameReady => IsFull;

        public bool IsPlayerTurn(User user)
        {
            if(!GameReady) { return false; }

            return Players[Game.PlayerTurn].ConnectionId == user.ConnectionId;
        }

        public Lobby(string lobbyId)
        {
            LobbyId = lobbyId;
        }
    }
}

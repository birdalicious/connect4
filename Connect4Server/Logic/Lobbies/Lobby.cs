using Connect4;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Lobbies
{
    public class Lobby : ILobby
    {
        public string LobbyId { get; set; }
        public List<User> Players { get; set; } = new();
        public List<User> Audience { get; set; } = new();
        public IConnect4 Game { get; set; } = new Connect4.Connect4();
        public bool IsFull => Players.Count == 2;
        public bool GameReady => IsFull;

        public bool IsPlayerTurn(User user)
        {
            if(!GameReady) { return false; }

            return Players[Game.PlayerTurn].UserId == user.UserId;
        }

        public Lobby(string lobbyId)
        {
            LobbyId = lobbyId;
        }
    }
}

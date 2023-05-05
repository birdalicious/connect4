using Connect4.Lobbies;
using Connect4.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connect4.Lobbies
{
    public class LobbyManager
    {
        private readonly Dictionary<string, Lobby> LobbyIdToLobbyMap = new();
        private readonly Dictionary<string, string> UserIdToLobbyIdMap = new();

        public List<Lobby> GetLobbies()
        {
            return LobbyIdToLobbyMap.Values.ToList();
        }

        public LobbyResponse JoinLobby(string LobbyId, User user)
        {
            if(!LobbyIdToLobbyMap.ContainsKey(LobbyId))
            {
                //create new lobby
                LobbyIdToLobbyMap.Add(LobbyId, new Lobby(LobbyId));
                return JoinLobby(LobbyId, user);
            }

            if(UserIdToLobbyIdMap.ContainsKey(user.ConnectionId))
            {
                return LobbyResponse.AlreadyInLobby;
            }

            var lobby = LobbyIdToLobbyMap[LobbyId];
            if(lobby.IsFull)
            {
                return  LobbyResponse.Full;
            }

            UserIdToLobbyIdMap.Add(user.ConnectionId, LobbyId);
            lobby.Players.Add(user);
            return LobbyResponse.Joined;
        }

        public LobbyResponse LeaveLobby(User user)
        {
            if(!UserIdToLobbyIdMap.ContainsKey(user.ConnectionId))
            {
                return LobbyResponse.NotInLobby;
            }

            var lobbyId = UserIdToLobbyIdMap[user.ConnectionId];

            LobbyIdToLobbyMap.Remove(lobbyId);
            UserIdToLobbyIdMap.Remove(user.ConnectionId);

            return LobbyResponse.Left;
        }

        public Lobby? CurrentLobby(string userId)
        {
            UserIdToLobbyIdMap.TryGetValue(userId, out string? lobbyId);
            if(lobbyId == null) { return null; }
            return LobbyIdToLobbyMap[lobbyId];
        }
    }}

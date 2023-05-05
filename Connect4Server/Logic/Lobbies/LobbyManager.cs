using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Lobbies
{
    public class LobbyManager : ILobbyManager
    {
        private readonly Dictionary<string, Lobby> LobbyIdToLobbyMap = new();
        private readonly Dictionary<string, string> UserIdToLobbyIdMap = new();

        public List<ILobby> GetLobbies()
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

            if(UserIdToLobbyIdMap.ContainsKey(user.UserId))
            {
                return LobbyResponse.AlreadyInLobby;
            }

            var lobby = LobbyIdToLobbyMap[LobbyId];
            if(lobby.IsFull)
            {
                return  LobbyResponse.Full;
            }

            UserIdToLobbyIdMap.Add(user.UserId, LobbyId);
            lobby.Players.Add(user);
            return LobbyResponse.Joined;
        }

        public LobbyResponse LeaveLobby(User user)
        {
            if(!UserIdToLobbyIdMap.ContainsKey(user.UserId))
            {
                return LobbyResponse.NotInLobby;
            }

            var lobbyId = UserIdToLobbyIdMap[user.UserId];

            LobbyIdToLobbyMap.Remove(lobbyId);
            UserIdToLobbyIdMap.Remove(user.UserId);

            return LobbyResponse.Left;
        }

        public ILobby? CurrentLobby(string userId)
        {
            UserIdToLobbyIdMap.TryGetValue(userId, out string? lobbyId);
            if(lobbyId == null) { return null; }
            return LobbyIdToLobbyMap[lobbyId];
        }
    }}

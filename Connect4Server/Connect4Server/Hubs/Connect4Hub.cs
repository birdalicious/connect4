using Connect4;
using Connect4.Lobbies;
using Connect4.Users;
using Microsoft.AspNetCore.SignalR;

namespace Connect4Server.Hubs
{
    public class Connect4Hub : Hub
    {
        private readonly LobbyManager _LobbyManager;
        public Connect4Hub(LobbyManager lobbyManager)
        {
            _LobbyManager = lobbyManager;
        }

        public async Task JoinLobby(string userName, string room)
        {
            User user = new User
            {
                Name = userName,
                ConnectionId = Context.ConnectionId
            };

            var response = _LobbyManager.JoinLobby(room, user);
            if (response != LobbyResponse.Joined)
            {
                await Clients.Caller.SendAsync("DidNotJoin", response.ToString());
                return;
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, room);
            await Clients.Group(room).SendAsync("JoinedLobby", userName);
        }

        public async Task LeaveLobby()
        {
            var lobby = _LobbyManager.CurrentLobby(Context.ConnectionId);
            if(lobby != null)
            {
                var user = lobby.Players
                    .First(p => p.ConnectionId == Context.ConnectionId);

                _LobbyManager.LeaveLobby(new User { ConnectionId = user.ConnectionId });

                await Clients.Group(lobby.LobbyId).SendAsync("LeftLobby", user.Name);
                await Groups.RemoveFromGroupAsync(user.ConnectionId, lobby.LobbyId);
            }
        }
    }
}

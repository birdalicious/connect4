using Connect4;
using Connect4.Lobbies;
using Connect4.Users;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.SignalR;
using System.Runtime.CompilerServices;

namespace Connect4Server.Hubs
{
    public class Connect4Hub : Hub
    {
        private const string WaitingLobbyName = "__WaitingInLobby__";
        private readonly LobbyManager _LobbyManager;
        public Connect4Hub(LobbyManager lobbyManager)
        {
            _LobbyManager = lobbyManager;
        }

        public async override Task OnDisconnectedAsync(Exception? exception)
        {
            await LeaveLobby();
            await base.OnDisconnectedAsync(exception);
        }
        
        public async override Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, WaitingLobbyName);
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

            var lobby = _LobbyManager.CurrentLobby(user.ConnectionId)!;

            await Groups.AddToGroupAsync(Context.ConnectionId, room);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, WaitingLobbyName);
            await Clients.Group(room).SendAsync("JoinedLobby", userName);

            if(lobby.GameReady)
            {
                await Clients.Group(room).SendAsync("GameStart", lobby.Players.Select(p => p.Name).ToList());
            }
            
            var lobbies = _LobbyManager.GetLobbies()
                .Where(l => !l.IsFull)
                .Select(l => l.LobbyId)
                .ToList();

            await Clients.Group(WaitingLobbyName).SendAsync("Lobbies", lobbies);
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
                await Groups.AddToGroupAsync(Context.ConnectionId, WaitingLobbyName);
            }
        } 

        public async Task ListLobbies()
        {
            var lobbies = _LobbyManager.GetLobbies()
                .Where(l => !l.IsFull)
                .Select(l => l.LobbyId)
                .ToList();

            await Clients.Caller.SendAsync("Lobbies", lobbies);
        }

        public async Task MakeMove(int column)
        {
            var lobby = _LobbyManager.CurrentLobby(Context.ConnectionId);
            if(lobby == null)
            {
                await Clients.Caller.SendAsync("NotConnected");
                return;
            }

            if(!lobby.GameReady)
            {
                await Clients.Caller.SendAsync("GameNotStarted");
            }

            var game = lobby.Game;

            //Check it is connections Turns
            if(!lobby.IsPlayerTurn(new User { ConnectionId = Context.ConnectionId }))
            {
                await Clients.Caller.SendAsync("NotYourTurn");
                return;
            }

            if(game.Play(column))
            {
                await Clients.Group(lobby.LobbyId).SendAsync("MoveMade", column);
                return;
            }

            await Clients.Caller.SendAsync("InvalidMove");
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connect4
{
   public interface IConnect4
    {
        int PlayerTurn { get; set; }
        int? Winner { get; }
        bool Play(int column);
        void NewGame();
    }
}

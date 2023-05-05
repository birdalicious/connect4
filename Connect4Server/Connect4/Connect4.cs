using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Connect4
{
    public class Connect4 : IConnect4
    {
        private ulong mask;
        private ulong position;

        public int PlayerTurn { get; set; }

        public int? Winner { get; private set; }

        public Connect4()
        {
            NewGame();
        }

        public void NewGame()
        {
            PlayerTurn = 0;
            Winner = null;
            mask = 0;
            position = 0;
        }

        public void GetPositionMaskBitMap(int[,] board, int player)
        {
            var position = "";
            var mask = "";

            for(var j = 6; j >= 0; j--)
            {
                mask += "0";
                position += "0";

                for(var i = 0; i < 6; i++)
                {
                    mask += board[i, j] != 0 ? "1" : "0";
                    position += board[i, j] == player ? "1" : "0";
                }
            }

            this.mask = Convert.ToUInt64(mask, 2);
            this.position = Convert.ToUInt64(position, 2);
        }

        private static bool ConnectedFour(ulong position)
        {
            // Horizontal check
            var m = position & (position >> 7);
            if((m & (m >> 14)) != 0)
            {
                return true;
            }

            // Diagonal \
            m = position & (position >> 6);
            if((m & (m >> 12)) != 0)
            {
                return true;
            }

            //Diagonal /
            m = position & (position >> 8);
            if((m & (m >> 16)) != 0)
            {
                return true;
            }

            // Vertical
            m = position & (position >> 1);
            if((m & (m >> 2)) != 0)
            {
                return true;
            }

            return false;
        }

        public bool Play(int column)
        {
            if(column < 0 || column > 6)
            {
                return false;
            }
            if((mask & ((ulong)32 << (column * 7))) != 0)
            {
                return false;
            }

            this.position = this.position ^ this.mask;
            this.mask = mask | (mask + ((ulong)1 << (column * 7)));

            if(ConnectedFour(this.position ^ this.mask))
            {
                Winner = PlayerTurn; ;
            }

            PlayerTurn += 1;
            PlayerTurn %= 2;

            return true;
        }
    }
}

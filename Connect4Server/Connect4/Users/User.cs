using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Connect4.Users
{
    public class User : IEquatable<User>
    {
        public string Name { get; set; }
        public string ConnectionId { get; set; }
        
        public override bool Equals(object? obj)
        {
            if(obj is User other)
            {
                return Equals(other);
            }

            return base.Equals(obj);
        }

        public bool Equals(User? other)
        {
            if(other == null)
            {
                return false;
            }

            return other.ConnectionId == this.ConnectionId;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(ConnectionId);
        }
    }
}

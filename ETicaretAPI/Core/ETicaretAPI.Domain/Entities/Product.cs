using ETicaretAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Domain.Entities
{
    public class Product : BaseEntity // Bir domain içerisinde entity örneği tanımladık. Sonraki aşamada bir arayüze ihtiyacım var.
    {
        public string Name { get; set; }
        public int Stock { get; set; }
        public float Price { get; set; }

        public ICollection<Order> Orders { get; set; } // Bir productın bir'den çok orderı olduğu anlama geliyor. 1 e n ilişki. Genel baktığımızda da n'e n
    }
}

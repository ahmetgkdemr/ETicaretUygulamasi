using ETicaretAPI.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Repositories
{
    public interface IRepository<T> where T :BaseEntity          //Generic bir yapılanma olduğunu görüyoruz. Belirli bir veri tipi olmadan farklı türlerle çalışılan kodlar yazamamızı sağlar
    {
        
        DbSet <T> Table {  get; }
    }
}

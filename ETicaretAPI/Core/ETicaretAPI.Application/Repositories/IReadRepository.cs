using ETicaretAPI.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Repositories
{
    public interface IReadRepository<T> : IRepository<T> where T : BaseEntity     //IReadRepository T referansını, kalıtım aldığı IRepository T den alacak. Tekrar belirtiyoruz T yerine class geleceğini
    {
        IQueryable<T> GetAll(bool tracking =true);   //sorgu üzerinde veritabanında çalıştığı için büyük verilerde daha perfornmanslıdır, Enumerabla'a göre (memoryde çalışır bu da)
        IQueryable<T> GetWhere(Expression<Func<T,bool>>method,bool tracking =true); //Şarta uyan verileri getirsin.
        Task <T> GetSingleAsync(Expression<Func<T,bool>>method, bool tracking = true);
        Task<T> GetByIDAsync(string id, bool tracking=true);
    }

}

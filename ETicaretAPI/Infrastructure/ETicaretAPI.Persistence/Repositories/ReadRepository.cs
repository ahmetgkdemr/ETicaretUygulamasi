using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Domain.Entities.Common;
using ETicaretAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistence.Repositories
{
    public class ReadRepository<T> : IReadRepository<T> where T : BaseEntity
    {
        public readonly ETicaretAPIDbContext _context;
        public ReadRepository(ETicaretAPIDbContext context) //burada dependency Injection ile _context nesnesini alıyoruz
        { 
            _context = context;
        }

        public DbSet<T> Table => _context.Set<T>();  //burada return ediyor gelen tabloyu. Generic olarak belirttik tabloyuda

        public IQueryable<T> GetAll(bool tracking = true)
        {
            var query = Table.AsQueryable();
            if (!tracking)
                query=query.AsNoTracking();
            return query;
        }

        public IQueryable<T> GetWhere(Expression<Func<T, bool>> method, bool tracking = true)
        {
            var query = Table.Where(method);
            if (!tracking)
                query = query.AsNoTracking();
            return query;
        }   
            //=>Table.Where(method);

        public async Task<T> GetByIDAsync(string id , bool tracking = true)
        {
            var query = Table.AsQueryable();
            if (!tracking)
                query=Table.AsNoTracking();
            return await query.FirstOrDefaultAsync(data => data.Id == Guid.Parse(id));

            
        }
        //=>await Table.FirstOrDefaultAsync(data => data.Id == Guid.Parse(id));
        //=> await Table.FindAsync(Guid.Parse(id));

        public async Task<T> GetSingleAsync(Expression<Func<T, bool>> method, bool tracking = true)
        { 
            var query = Table.AsQueryable();
            if(!tracking)
                query=Table.AsNoTracking();
            return await query.FirstOrDefaultAsync(method);

        }
        //=> await Table.FirstOrDefaultAsync(method);

    }
}

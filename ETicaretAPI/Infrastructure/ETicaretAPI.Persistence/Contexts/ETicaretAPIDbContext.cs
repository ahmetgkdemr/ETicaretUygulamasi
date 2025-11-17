using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Domain.Entities;
using ETicaretAPI.Domain.Entities.Common;
using ETicaretAPI.Domain.Entities.Identity;
using ETicaretAPI.Persistence.Contexts;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Persistence.Contexts
{
    public class ETicaretAPIDbContext : IdentityDbContext<AppUser,AppRole,string>     //NTT framework ORM sini kullanacağımız, veritabanına karşılık gelen Dbcontext kütüphanesinden gelir(core da olan kütüphane DbContext)
    {
        public ETicaretAPIDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet <Product> Products{ get; set; }    //Dbset Entity Framework ile Product adlı bir sınıfa karşılık gelen veri tablosunu temsil eder.
        public DbSet <Customer> Customers{ get; set; }   // Müşteri sınıfını temsil etmek için kullanılır veri tabanında
        public DbSet <Order> Orders { get; set; }        // Sipariş sınıfını temsil etmek için kullanılır veri tabanı tablosunda 

        public DbSet<Domain.Entities.File> Files { get; set; }
        public DbSet <ProductImageFile> ProductImageFiles { get; set; }
        public DbSet<InvoiceFile> InvoiceFiles { get; set; }


        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var datas = ChangeTracker.Entries<BaseEntity>();
            foreach (var data in datas) 
            {
                _ = data.State switch
                {
                    EntityState.Added => data.Entity.CreatedDate = DateTime.UtcNow,
                    EntityState.Modified => data.Entity.UpdatedDate = DateTime.UtcNow,
                    _=>DateTime.UtcNow
                };
            }

            return base.SaveChangesAsync(cancellationToken);
        }
        
        
    }
}


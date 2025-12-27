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
        public DbSet<Basket> Baskets{ get; set; }
        public DbSet<BasketItem> BasketItems{ get; set; }

        //birebir bir ilişki söz konusu olduğu için on modelmodelcreating metodu override edilecek
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Order>()
                .HasKey(o=>o.Id);  //Order entitysinin primary key inin Id olduğunu belirtiyoruz

            builder.Entity<Order>()
                .HasIndex(o => o.OrderCode)
                .IsUnique();

            builder.Entity<Order>()
                .HasOne(o=>o.Basket)//Order entitysinin bir Basket a sahip olduğunu belirtiyoruz
                .WithOne(b=>b.Order)//Basket entitysinin de bir Order a sahip olduğunu belirtiyoruz
                .HasForeignKey<Order>(o=>o.Id);//Order baskete bağımlı olduğu için foreign key i orderda belirtiyoruz yani order tablosunda orderID=basketID olacak

            base.OnModelCreating(builder); //burada bir identity framework metodu override edildiği için base in onmodelcreating metodu çağrılır yoksa hata verir
        }


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

//Orn 1-1 bir iliskide kim kime bagimlidir sorusuna net cevap: Kim sonra geliyorsa, öncekine bagimlidir. Orn basket ve order arasında, once basket olur ardından order gelir. O halde order basket e bagimlidir. 
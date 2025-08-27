﻿using Microsoft.Extensions.Configuration;
using ETicaretAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ETicaretAPI.Persistence.Repositories;
using ETicaretAPI.Application.Repositories;

namespace ETicaretAPI.Persistence 
{
    public static class ServiceRegistration  
    {
        public static void AddPersistenceServices(this IServiceCollection services)  // bu direkt bizim ioc konteynır arayüzümüze bir extent ion sağlıyor. Yani bu fonksiyonla ben direkt ioc konteynıra datalarımı gönderebiliyorum 
        {
            //Her bir servisimi benim IoC kontreynırıma ekleyebilmem için buradaki extention metodu kullanmam yeterli olacaktır. 
            //Ancak benim buraya eklemem yeterli değil bunu enjekte edip kullanabilmem için benim bunu ASP.DotnetCore uygulaması tarafından çağrılması gerekir(Program.cs)
            //bunun içinde benim Presentationa Persistence için referans eklemem gerekiyor. Referance Manegentmentta)
            services.AddDbContext<ETicaretAPIDbContext>(options => options.UseNpgsql(Configuration.ConnectionString));
            services.AddScoped<ICustomerReadRepository, CustomerReadRepository>();
            services.AddScoped<ICustomerWriteRepository, CustomerWriteRepository>();
            services.AddScoped<IOrderReadRepository, OrderReadRepository>();
            services.AddScoped<IOrderWriteRepository, OrderWriteRepository>();
            services.AddScoped<IProductReadRepository, ProductReadRepository>();
            services.AddScoped<IProductWriteRepository, ProductWriteRepository>();
            services.AddScoped<IFileReadRepository, FileReadRepository>();
            services.AddScoped<IFileWriteRepository, FileWriteRepository>();
            services.AddScoped<IProductImageFileReadRepository, ProductImageFileReadRepository>();
            services.AddScoped<IProductImageFileWriteRepository, ProductImageFileWriteRepository>();
            services.AddScoped<IInvoiceFileReadRepository, InvoiceFileReadRepository>();   
            services.AddScoped<IInvoiceFileWriteRepository, InvoiceFileWriteRepository>();
            
        }
    }
}

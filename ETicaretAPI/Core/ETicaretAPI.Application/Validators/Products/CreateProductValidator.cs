using ETicaretAPI.Application.ViewModels.Products;
using ETicaretAPI.Domain.Entities;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Validators.Products
{
    public class CreateProductValidator : AbstractValidator<VM_Create_Product>
    {
        public CreateProductValidator()
        {
            RuleFor(p => p.Name)
                .NotNull()
                .NotEmpty()
                    .WithMessage("Lütfen ürün adını boş geçmeyiniz.")
                .MaximumLength(150)
                .MinimumLength(5)
                    .WithMessage("Lütfen ürün adını 5 ile 150 karakter arasında giriniz.");

            RuleFor(p => p.Stock)
                .NotEmpty()
                .NotEmpty()
                    .WithMessage("Lütfen ürün stok bilgisini doldurunuz")
                .Must(s => s >= 0)
                    .WithMessage("Lütfen stok bilgisini 0 veya daha büyük giriniz.");

            RuleFor(p => p.Price)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Lütfen Ücret bilgisini doldurunuz.")
                .Must(s => s >= 0)
                    .WithMessage("Lütfen ücret bilgisini 0 veya daha büyük giriniz.");
        }
    }
}

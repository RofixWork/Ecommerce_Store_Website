using Ecommerce_Website_APIs.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Ecommerce_Website_APIs.Data.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Title).HasColumnType("varchar").HasMaxLength(255).IsRequired();
            builder.Property(p => p.Price).HasColumnType("decimal(15, 2)").IsRequired();
            builder.Property(p => p.Discount).IsRequired();
            builder.Property(p => p.Stock).IsRequired();
            builder.Property(p => p.CategoryId).IsRequired();
            builder.Property(p => p.Description).HasColumnType("text").IsRequired();
            builder.Property(p => p.Image1).HasColumnType("text").IsRequired();
            builder.Property(p => p.Image2).HasColumnType("text").IsRequired();
            builder.Property(p => p.Image3).HasColumnType("text").IsRequired();
            builder.Property(p => p.CreatedDate).HasColumnType("datetime2").HasDefaultValueSql("getdate()");
            builder.Property(p => p.UpdatedDate).HasColumnType("datetime2").HasDefaultValueSql("getdate()");
            //relation
            builder.HasOne(p => p.Category).WithMany(p => p.Products).HasForeignKey(p => p.CategoryId).IsRequired();
            builder.ToTable("Products");
        }
    }
}

using Ecommerce_Website_APIs.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Ecommerce_Website_APIs.Data.Config
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.ProductId).HasColumnType("int").IsRequired();
            builder.Property(p => p.UserId).HasColumnType("nvarchar(450)").IsRequired();
            builder.Property(p => p.Quantity).HasColumnType("int").IsRequired();
            builder.Property(p => p.Color).HasColumnType("varchar(15)").IsRequired(false);
            builder.Property(p => p.Size).HasColumnType("varchar(15)").IsRequired(false);
            builder.Property(p => p.CreatedData).HasColumnType("datetime2").HasDefaultValueSql("getdate()");
            builder.Property(p => p.UpdatedData).HasColumnType("datetime2").HasDefaultValueSql("getdate()");
            builder.Property(p => p.Received).HasDefaultValue(0).IsRequired();
            builder.Property(p => p.Status).HasDefaultValue(0).IsRequired();
            builder.HasOne(p => p.Product).WithMany(p => p.Orders).HasForeignKey(p => p.ProductId).IsRequired();
            builder.HasOne(p => p.User).WithMany(p => p.Orders).HasForeignKey(p => p.UserId).IsRequired();

            builder.ToTable("Orders");
        }
    }
}

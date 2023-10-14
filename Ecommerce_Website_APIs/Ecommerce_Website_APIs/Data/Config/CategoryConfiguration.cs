using Ecommerce_Website_APIs.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Ecommerce_Website_APIs.Data.Config
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(p => p.Id);
            builder.HasIndex(p => p.Name).IsUnique();
            builder.Property(p => p.Name).HasColumnType("varchar").HasMaxLength(256).IsRequired();
            builder.Property(p => p.CreatedDate).HasColumnType("datetime2").HasDefaultValueSql("getdate()");
            builder.Property(p => p.UpdatedDate).HasColumnType("datetime2").HasDefaultValueSql("getdate()");
            builder.ToTable("Categories");
        }
    }
}

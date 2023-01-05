using Catalog_Online.Models;
using Microsoft.EntityFrameworkCore;

namespace Catalog_Online.Helper
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions options)
        : base(options)
        {
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Roles> Roles { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Users>()
                .HasOne<Roles>()
                .WithMany()
                .HasForeignKey(u => u.RoleId);
        }
    }
}

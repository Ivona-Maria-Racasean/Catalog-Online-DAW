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

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<StudentData> StudentsData { get; set; } 
        public DbSet<StudentCertificate> StudentCertificates { get; set; }  
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Mark> Marks { get; set; }  
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasOne<Role>()
                .WithMany()
                .HasForeignKey(u => u.RoleId);

            modelBuilder.Entity<StudentData>()
                .HasOne<User>()

                .WithMany()
                .HasForeignKey(sd => sd.UserId);

            modelBuilder.Entity<StudentCertificate>()
               .HasOne<User>()
               .WithMany()
               .HasForeignKey(sc => sc.UserId);

            modelBuilder.Entity<Teacher>()
              .HasOne<User>()
              .WithMany()
              .HasForeignKey(t => t.UserId);

            modelBuilder.Entity<Subject>()
                .HasOne<Teacher>()
                .WithMany()
                .HasForeignKey(s => s.TeacherId);

            modelBuilder.Entity<Mark>()
                .HasOne<Subject>()
                .WithMany()
                .HasForeignKey(m => m.SubjectId)
               .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Mark>()
               .HasOne<User>()
               .WithMany()
               .HasForeignKey(m => m.UserId)
               .OnDelete(DeleteBehavior.NoAction);
        }
    }
}

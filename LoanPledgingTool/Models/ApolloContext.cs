using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace LoanPledgingTool.Models
{
    public partial class ApolloContext : DbContext
    {
        public ApolloContext()
        {
        }

        public ApolloContext(DbContextOptions<ApolloContext> options)
            : base(options)
        {
        }

        public virtual DbSet<LptUser> LptUser { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=qbf-sqlqa1\\apollo;Database=Apollo;Trusted_Connection=True;Integrated Security=False;user id=sa;password=th35ai44;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<LptUser>(entity =>
            {
                entity.Property(e => e.FirstName).HasMaxLength(64);

                entity.Property(e => e.LastName).HasMaxLength(64);

                entity.Property(e => e.PasswordHash).HasMaxLength(16);

                entity.Property(e => e.PasswordSalt).HasMaxLength(16);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(64);
            });
        }
    }
}

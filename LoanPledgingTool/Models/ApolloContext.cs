using Microsoft.EntityFrameworkCore;

namespace LoanPledgingTool.Models
{
	public partial class ApolloContext : DbContext
	{
		private readonly ISsmService<DbCredentials> _config;

		public ApolloContext()
		{
		}

		public ApolloContext(DbContextOptions<ApolloContext> options, ISsmService<DbCredentials> config)
			: base(options)
		{
			_config = config;
		}

		public virtual DbSet<LptUser> LptUser { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			if (!optionsBuilder.IsConfigured)
			{
				optionsBuilder.UseSqlServer(_config.Credentials.ConnectionStrings.Apollo);
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
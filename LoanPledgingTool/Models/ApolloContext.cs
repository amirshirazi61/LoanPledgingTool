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

        public virtual DbSet<BorrowingBaseSecuritization> BorrowingBaseSecuritization { get; set; }
        public virtual DbSet<LptUser> LptUser { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
			if (!optionsBuilder.IsConfigured)
			{
				optionsBuilder.UseSqlServer(@"Data Source=(localdb)\ProjectsV13;Initial Catalog=Apollo;
											Integrated Security = True; Connect Timeout = 30; Encrypt = False;TrustServerCertificate = False;
											ApplicationIntent = ReadWrite; MultiSubnetFailover = False"
					/*_config.Credentials.ConnectionStrings.Apollo*/);
			}
		}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<BorrowingBaseSecuritization>(entity =>
            {
                entity.HasKey(e => e.ContractId);

                entity.Property(e => e.ContractId)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.AcctDistCode)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Achbank)
                    .HasColumnName("ACHBank")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Address)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.AmountOfLastCollection).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.AverageDepositNumber).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.AxosFlag)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Bofiflag)
                    .HasColumnName("BOFIFlag")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.BusinessStartDate).HasColumnType("datetime");

                entity.Property(e => e.CalculatedReceivablesYield).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.ChargeOffDate).HasColumnType("date");

                entity.Property(e => e.City)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Collateral)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ContractPostDate).HasColumnType("date");

                entity.Property(e => e.CurrentBankNumber)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerName)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.DailyPayment).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.DailyRate).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.DateOfLastCollection).HasColumnType("date");

                entity.Property(e => e.ExpectedPayment).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.FirstPaymentRequiredDate).HasColumnType("date");

                entity.Property(e => e.FourDigitSic)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.FundDate).HasColumnType("date");

                entity.Property(e => e.Guarantor)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Industry)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.InternalFundingStatus)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.LoanAmount).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.LtdInterest).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.LtdPrincipal).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.MaturityDate).HasColumnType("date");

                entity.Property(e => e.MonthlySales).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.OriginationType)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.PayCycle)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.PayoffAmount).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.PledgeDate).HasColumnType("date");

                entity.Property(e => e.RateFactor).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.RemainingPrincipal).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.Renewal)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.RenewalDate).HasColumnType("date");

                entity.Property(e => e.SicCode)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.State)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.TerminationDate).HasColumnType("date");

                entity.Property(e => e.TerminationDisposition)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.TotalCollected).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.TotalRepayment).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.UseOfFunds)
                    .HasMaxLength(1)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LptUser>(entity =>
            {
                entity.Property(e => e.FirstName).HasMaxLength(64);

                entity.Property(e => e.LastName).HasMaxLength(64);

                entity.Property(e => e.PasswordHash).HasMaxLength(8000);

                entity.Property(e => e.PasswordSalt).HasMaxLength(8000);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(64);
            });
        }
    }
}

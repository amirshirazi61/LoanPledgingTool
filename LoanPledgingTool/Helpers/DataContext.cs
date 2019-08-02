using LoanPledgingTool.Models;
using Microsoft.EntityFrameworkCore;

namespace LoanPledgingTool.Helpers
{
    public class DataContext : ApolloContext
    {
        public DataContext(DbContextOptions<ApolloContext> options) : base(options) { }

        public DbSet<LptUser> Users { get; set; }
    }
}
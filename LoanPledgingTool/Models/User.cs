namespace LoanPledgingTool.Models
{
    public partial class User
    {
        public string FirstName { get; set; }

        public int Id { get; set; }

        public string LastName { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public string Username { get; set; }
    }
}
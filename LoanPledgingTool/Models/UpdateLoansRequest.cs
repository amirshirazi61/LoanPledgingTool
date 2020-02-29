using System;

namespace LoanPledgingTool.Models
{
    public class UpdateLoansRequest
    {
        public DateTime Date { get; set; }

        public string[] LoanIds { get; set; }

        public int AccountId { get; set; }
    }
}
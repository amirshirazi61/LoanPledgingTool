using System;
using System.Collections.Generic;

namespace LoanPledgingTool.Models
{
    public partial class BorrowingBaseSecuritization
    {
        public string ContractId { get; set; }
        public int? CustomerNumber { get; set; }
        public string CustomerName { get; set; }
        public string SicCode { get; set; }
        public string Industry { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public DateTime? BusinessStartDate { get; set; }
        public int? CreditRating { get; set; }
        public decimal DailyPayment { get; set; }
        public DateTime FundDate { get; set; }
        public DateTime? MaturityDate { get; set; }
        public decimal? LoanAmount { get; set; }
        public decimal? RemainingPrincipal { get; set; }
        public decimal? AverageDepositNumber { get; set; }
        public int? RemainingPayments { get; set; }
        public int? TotalPayments { get; set; }
        public decimal TotalRepayment { get; set; }
        public string InternalFundingStatus { get; set; }
        public int? NumberOfModifications { get; set; }
        public decimal? DailyRate { get; set; }
        public decimal? LtdPrincipal { get; set; }
        public decimal? LtdInterest { get; set; }
        public decimal? TotalCollected { get; set; }
        public int? PaymentsCollected { get; set; }
        public decimal RateFactor { get; set; }
        public string UseOfFunds { get; set; }
        public decimal? MonthlySales { get; set; }
        public string Bofiflag { get; set; }
        public int? YearsInBusiness { get; set; }
        public string PayCycle { get; set; }
        public string Achbank { get; set; }
        public DateTime? DateOfLastCollection { get; set; }
        public decimal? AmountOfLastCollection { get; set; }
        public string Renewal { get; set; }
        public int? NumberOfTimesRenewed { get; set; }
        public DateTime? RenewalDate { get; set; }
        public string Guarantor { get; set; }
        public int? OpenLiens { get; set; }
        public string FourDigitSic { get; set; }
        public decimal? ExpectedPayment { get; set; }
        public int? QuickBridgeRiskTierScore { get; set; }
        public decimal? CalculatedReceivablesYield { get; set; }
        public string AcctDistCode { get; set; }
        public DateTime? TerminationDate { get; set; }
        public DateTime? ContractPostDate { get; set; }
        public int? Term { get; set; }
        public string TerminationDisposition { get; set; }
        public string Collateral { get; set; }
        public decimal? PayoffAmount { get; set; }
        public string AxosFlag { get; set; }
        public string OriginationType { get; set; }
        public bool IsPledged { get; set; }
        public bool? IsActive { get; set; }
        public int? TermInMonths { get; set; }
        public DateTime? FirstPaymentRequiredDate { get; set; }
        public DateTime? ChargeOffDate { get; set; }
        public string CurrentBankNumber { get; set; }
        public DateTime? PledgeDate { get; set; }
    }
}

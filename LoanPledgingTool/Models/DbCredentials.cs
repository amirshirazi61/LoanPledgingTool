namespace LoanPledgingTool.Models
{
	public class ConnectionStrings
	{
		public string Apollo { get; set; }

		public string Replication { get; set; }
	}

	public class DbCredentials
	{
		public ConnectionStrings ConnectionStrings { get; set; }

		public SsisConfig SsisConfig { get; set; }
	}

	public class SsisConfig
	{
		public string StoredProcName { get; set; }
	}
}
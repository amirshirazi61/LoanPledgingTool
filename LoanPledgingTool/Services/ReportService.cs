using LoanPledgingTool.Models;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoanPledgingTool.Services
{
	public interface IReportService
	{
		Task<byte[]> GetFile();
	}

	public class ReportService : IReportService
	{
		private readonly ISsmService<DbCredentials> _dbCredentials;

		public ReportService(ISsmService<DbCredentials> dbCredentials) => _dbCredentials = dbCredentials;

		public async Task<byte[]> GetFile()
		{
			var dt = await GetData();
			string fileContent = ToCsv(dt);
			return Encoding.ASCII.GetBytes(fileContent);
		}

		private Task<DataTable> GetData()
		{
			string connectionString = _dbCredentials.Credentials.ConnectionStrings.Replication;
			return Task<DataTable>.Factory.StartNew(() =>
			{
				using (SqlConnection conn = new SqlConnection(connectionString))
				{
					SqlCommand cmd = new SqlCommand(_dbCredentials.Credentials.SsisConfig.StoredProcName, conn)
					{
						CommandType = CommandType.StoredProcedure,
						CommandTimeout = 180
					};

					SqlDataAdapter adapter = new SqlDataAdapter()
					{
						SelectCommand = cmd
					};

					DataTable dt = new DataTable();
					adapter.Fill(dt);

					return dt;
				}
			});
		}

		private string ToCsv(DataTable dt)
		{
			if (dt.Rows.Count == 0)
				return null;

			StringBuilder sb = new StringBuilder();
			IEnumerable<string> columnNames = dt.Columns.Cast<DataColumn>().Select(c => c.ColumnName);
			sb.AppendLine(string.Join(",", columnNames));

			foreach (DataRow row in dt.Rows)
			{
				IEnumerable<string> fields = row.ItemArray.Select(f => $"\"{f?.ToString()?.Replace("\"", "\"\"")} \"");
				sb.AppendLine(string.Join(",", fields));
			}

			return sb.ToString();
		}
	}
}
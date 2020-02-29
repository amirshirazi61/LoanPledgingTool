using LoanPledgingTool.Helpers;
using LoanPledgingTool.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Npoi.Mapper;
using NPOI.SS.UserModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace LoanPledgingTool.Services
{
    public interface IPledgingService
    {
        List<string> GetBlaNumbers(IFormFile file);

        int UpdatePledgingLoans(UpdateLoansRequest request, string userId);
    }

    public class PledgingService : IPledgingService
    {
        private readonly AppSettings _appSettings;
        private readonly ApolloContext _context;

        public PledgingService(IOptions<AppSettings> appSettings, ApolloContext context)
        {
            _context = context;
            _appSettings = appSettings.Value;
        }

        public List<string> GetBlaNumbers(IFormFile file)
        {
            IWorkbook workbook;
            using (var stream = file.OpenReadStream())
            {
                workbook = WorkbookFactory.Create(stream);
            }

            var importer = new Mapper(workbook);
            var items = importer.Take<dynamic>(0).ToList();
            if ((items?.Count ?? 0) == 0)
                throw new ArgumentException($"The excel sheet has no record or empty.");

            var ids = items.Select(GetIdsFromColumn).Where(i => !string.IsNullOrEmpty(i));
            if (ids.Count() == 0)
                throw new ArgumentException($"No data found in column \"{_appSettings.LoanIdColumnName}\" or the column is not found.");

            ids = ids.Where(id => Regex.IsMatch(id, _appSettings.LoanIdRegex));
            if (ids.Count() == 0)
                throw new ArgumentException($"No valid records found. Records must contain only digits and dashes in between digits.");

            return ids.OrderBy(x => x).ToList();
        }

        public int UpdatePledgingLoans(UpdateLoansRequest request, string userId)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("BlaNumber");
            foreach (var loanId in request.LoanIds)
                dt.Rows.Add(loanId);

            var pd = new SqlParameter("@PLEDGINGDATA", dt)
            {
                TypeName = "[dbo].[PledgingLoanType]"
            };

            int result;
            if (request.AccountId == 97)
            {
                result = _context.Database.ExecuteSqlCommand(new RawSqlString("exec [dbo].[UpdatePledgingData] @PLEDGINGDATA, @PLEDGEDATE, @USR"),
                     pd,
                    new SqlParameter("@PLEDGEDATE", request.Date),
                    new SqlParameter("@USR", Convert.ToInt64(userId)));
            }
            else
            {
                result = _context.Database.ExecuteSqlCommand(new RawSqlString("exec [dbo].[UpdatePledgingDataNFAS] @PLEDGINGDATA, @PLEDGEDATE, @USR"),
                                     pd,
                                    new SqlParameter("@PLEDGEDATE", request.Date),
                                    new SqlParameter("@USR", Convert.ToInt64(userId)));
            }

            return result;
        }

        private string GetIdsFromColumn(RowInfo<dynamic> item)
        {
            if (Extensions.TryGetValue(item.Value, _appSettings.LoanIdColumnName, out dynamic id) && id != null)
            {
                string idString = Convert.ToString(id);
                return idString;
            }

            return null;
        }
    }
}
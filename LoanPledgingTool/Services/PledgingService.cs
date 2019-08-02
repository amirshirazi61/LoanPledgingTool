using LoanPledgingTool.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Npoi.Mapper;
using NPOI.SS.UserModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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
        private ApolloContext _context;

        public PledgingService(ApolloContext context)
        {
            _context = context;
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

            List<string> LoanIds = new List<string>();
            foreach (var item in items)
            {
                var id = item?.Value?.B;
                if (id == null)
                    continue;

                string idString = Convert.ToString(id);
                if (Regex.IsMatch(idString, @"^[0-9-]*$"))
                    LoanIds.Add(idString);
            }

            return LoanIds.OrderBy(x => x).ToList();
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
            else {
                result = _context.Database.ExecuteSqlCommand(new RawSqlString("exec [dbo].[UpdatePledgingDataNFAS] @PLEDGINGDATA, @PLEDGEDATE, @USR"),
                                     pd,
                                    new SqlParameter("@PLEDGEDATE", request.Date),
                                    new SqlParameter("@USR", Convert.ToInt64(userId)));
            }

            return result;
        }
    }
}
using LoanPledgingTool.Filters;
using LoanPledgingTool.Models;
using LoanPledgingTool.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace LoanPledgingTool.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Logging]
    public class PledgingController : ControllerBase
    {
        private readonly IPledgingService _pledgingService;
        private readonly IReportService _reportService;

        public PledgingController(IPledgingService pledgingService, IReportService reportService)
        {
            _pledgingService = pledgingService;
            _reportService = reportService;
        }

        public ActionResult<List<string>> GetBlaNumbers()
        {
            var files = Request.Form?.Files;
            if (files == null || files.Count == 0)
                return Ok();

            return Ok(_pledgingService.GetBlaNumbers(files[0]));
        }

        [HttpGet]
        public FileContentResult Getfile()
        {
            byte[] bytes = _reportService.GetFile();
            return File(bytes, "application/octet-stream");
        }

        [HttpPost]
        public ActionResult<int> UpdateLoans(UpdateLoansRequest request)
        {
            string userId = User.FindFirst(ClaimTypes.Name)?.Value;
            _pledgingService.UpdatePledgingLoans(request, userId);
            return Ok();
        }
    }
}
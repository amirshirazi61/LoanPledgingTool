using LoanPledgingTool.Filters;
using LoanPledgingTool.Models;
using LoanPledgingTool.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace LoanPledgingTool.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Logging]
    public class PledgingController : ControllerBase
    {
        private IPledgingService _pledgingService;

        public PledgingController(IPledgingService pledgingService)
        {
            _pledgingService = pledgingService;
        }

        public ActionResult<List<string>> GetBlaNumbers()
        {
            var files = Request.Form?.Files;
            if (files == null || files.Count == 0)
                return Ok();

            return Ok(_pledgingService.GetBlaNumbers(files[0]));
        }

        [HttpPost]
        public ActionResult<int> UpdateLoans(UpdateLoansRequest request)
        {
            string userId = User.FindFirst(ClaimTypes.Name)?.Value;
            _pledgingService.UpdatePledgingLoans(request, userId);
            return Ok(request.LoanIds.Count());
        }
    }
}
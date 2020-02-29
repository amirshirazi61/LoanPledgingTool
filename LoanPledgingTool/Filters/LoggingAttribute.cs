using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using NF.Platform.Infrastructure.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoanPledgingTool.Filters
{
    public class LoggingAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Task.Run(() =>
            {
                var controller = context.ActionDescriptor.RouteValues?.FirstOrDefault(rv => rv.Key == "controller").Value;
                var action = context.ActionDescriptor.RouteValues?.FirstOrDefault(rv => rv.Key == "action").Value;
                StringBuilder log = new StringBuilder();
                log.Append($"{controller}/{action} invoked");

                List<string> args = new List<string>();
                foreach (var arg in context.ActionArguments)
                    args.Add($" {arg.Key} = { JsonConvert.SerializeObject(arg.Value)}");
                if (args.Count > 0)
                    log.Append($" with args: {string.Join(", ", args)}");
                log.Append(".");

                Logger.Instance.LogInfo(log.ToString());

                base.OnActionExecuting(context);
            });
        }
    }
}
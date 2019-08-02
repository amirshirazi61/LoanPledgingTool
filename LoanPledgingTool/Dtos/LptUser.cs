using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LoanPledgingTool.Models
{
    public partial class LptUser
    {
        [NotMapped]
        public string Token { get; set; }
    }
}

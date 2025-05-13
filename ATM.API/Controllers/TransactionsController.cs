
using System.Security.Principal;
using ATM.API.Data;
using ATM.API.Dtos;
using ATM.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static ATM.API.Controllers.AccountsController;


// Notes for reviewer:
//   Some tradeoffs were made for the sake of time. In an ideal world, I would have made the following improvements.
//     1)I would have moved most of the logic for withdraw, deposit, and transfer, into a service, as well as the
//          logic for recording transactions. This would allow for DRYing up the repeated code in these routes
//     2) I also would have made return types for the routes DTOs, instead of anonymous objects.
//     3) Enumerators instead of strings for things like "TransactionType".  
//     4) JS Alerts for successful transactions and errors should be replaced by custom component
//     5) Logging for failed transactions
//     6) Account names displayed for transfers in Transaction History (instead of just account 1 and account 2)

// other tradeoffs. Using AI for all styling, and a lot of the scaffolding for react.
// not having a nice ui for transaction history. ATM fees, and user pin.

namespace ATM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly AtmContext _context;

        public TransactionsController(AtmContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            var transactions = await _context.Transactions.ToListAsync();
            return Ok(transactions);
        }

    }
}

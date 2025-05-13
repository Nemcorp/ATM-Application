
using System.Security.Principal;
using ATM.API.Data;
using ATM.API.Dtos;
using ATM.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static ATM.API.Controllers.AccountsController;


namespace ATM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly AtmContext _context;
        private long transactionLimit = 50000;

        public AccountsController(AtmContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            _context.Database.EnsureCreated();

            var accounts = await _context.Accounts.ToListAsync();
            return Ok(accounts);
        }

        [HttpPost("{accountId}/deposit")]
        public async Task<ActionResult<object>> Deposit(int accountId, [FromBody] DepositRequest depositRequest)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if(account == null) { return NotFound();  }
            if(depositRequest.Amount < 0.01m) { return BadRequest("Deposit amount can not be negative"); }
            if (depositRequest.Amount > transactionLimit) { return BadRequest("Transaction Limit Exceeded. Please contact your bank to increase your limit"); }

            account.Balance += depositRequest.Amount;

            await _context.Transactions.AddAsync(
                new Transaction
                {
                    SourceAccountId = accountId,
                    TargetAccountId = null,
                    Amount = depositRequest.Amount,
                    TransactionType = "Deposit",
                    Timestamp = DateTime.Now
                }
            );

            await _context.SaveChangesAsync();
            return Ok(new { balance = account.Balance});
        }

        [HttpPost("{accountId}/withdraw")]
        public async Task<ActionResult<object>> Withdraw(int accountId, [FromBody] WithdrawRequest withdrawRequest)
        {
            var account = await _context.Accounts.FindAsync(accountId);
            if (account == null) { return NotFound(); }
            if (withdrawRequest.Amount < 0.01m) { return BadRequest("Withdraw amount can not be negative"); }
            if (withdrawRequest.Amount > account.Balance) { return BadRequest("Withdraw amount exceeds balance."); }
            if (withdrawRequest.Amount > transactionLimit) { return BadRequest("Transaction Limit Exceeded. Please contact your bank to increase your limit"); }


            account.Balance -= withdrawRequest.Amount;

            await _context.Transactions.AddAsync(
                  new Transaction
                  {
                      SourceAccountId = accountId,
                      TargetAccountId = null,
                      Amount = withdrawRequest.Amount,
                      TransactionType = "Withdraw",
                      Timestamp = DateTime.Now
                  }
              );

            await _context.SaveChangesAsync();
            return Ok(new { balance = account.Balance});
        }


        [HttpPost("{accountId}/transfer")]
        public async Task<ActionResult<object>> Transfer(int accountId, [FromBody] TransferRequest transferRequest)
        {
            var sourceAccount = await _context.Accounts.FindAsync(accountId);
            var targetAccount = await _context.Accounts.FindAsync(transferRequest.TargetAccountId);
            if (sourceAccount == null || targetAccount == null) { return NotFound(); }
            if (transferRequest.Amount < 0.01m) { return BadRequest("Transfer amount can not be negative"); }
            if (transferRequest.Amount > sourceAccount.Balance) { return BadRequest("Transfer amount exceeds balance."); }
            if (transferRequest.Amount > transactionLimit) { return BadRequest("Transaction Limit Exceeded. Please contact your bank to increase your limit"); }


            sourceAccount.Balance -= transferRequest.Amount;
            targetAccount.Balance += transferRequest.Amount;

            await _context.Transactions.AddAsync(
              new Transaction
              {
                  SourceAccountId = accountId,
                  TargetAccountId = transferRequest.TargetAccountId,
                  Amount = transferRequest.Amount,
                  TransactionType = "Transfer",
                  Timestamp = DateTime.Now
              }
          );

            await _context.SaveChangesAsync();
            return Ok(new { balance = sourceAccount.Balance });
        }

    }
}

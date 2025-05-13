using ATM.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ATM.API.Data
{
    public class AtmContext : DbContext
    {
        public AtmContext(DbContextOptions<AtmContext> options) : base(options) { }
        
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // just some dummy data for our user account.
            modelBuilder.Entity<Account>().HasData(
                new Account { Id = 1, Type = "Checking", Balance = 1000 },
                new Account { Id = 2, Type = "Savings", Balance = 7000 }
            );
        }
    }
}
namespace ATM.API.Models
{
    public class Transaction
    {

        public int Id { get; set; }
        public int SourceAccountId { get; set; }
        public int? TargetAccountId { get; set; }
        public decimal Amount { get; set; }
        public string TransactionType { get; set; } // "Deposit", "Withdrawal", "Transfer"
        public DateTime Timestamp { get; set; }

    }
}

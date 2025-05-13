namespace ATM.API.Dtos
{
    public class TransferRequest
    {
        public int targetAccountId { get; set; }
        public decimal Amount { get; set; }
    }

}

namespace ATM.API.Dtos
{
    public class TransferRequest
    {
        public int TargetAccountId { get; set; }
        public decimal Amount { get; set; }
    }

}

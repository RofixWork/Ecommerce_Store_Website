namespace Ecommerce_Website_APIs.Helpers
{
    public record OrderData
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public string? Color { get; set; }
        public string? Size { get; set; }
        public string? UserId { get; set; }
    }
}

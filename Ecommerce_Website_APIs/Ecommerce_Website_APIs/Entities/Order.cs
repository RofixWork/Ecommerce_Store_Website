namespace Ecommerce_Website_APIs.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
        public string? UserId { get; set; }
        public User User { get; set; } = null!;
        public string? Color { get; set; }
        public string? Size { get; set; }
        public int Quantity { get; set; }
        public bool Status { get; set; }
        public bool Received { get; set; }
        public DateTime CreatedData { get; set; }
        public DateTime UpdatedData { get; set; }
    }
}

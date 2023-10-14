namespace Ecommerce_Website_APIs.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public decimal Price { get; set; }
        public int Discount { get; set; }
        public int Stock { get; set; }
        public string? Colors { get; set; }
        public string? Sizes { get; set; }
        public string? Image1 { get; set; }
        public string? Image2 { get; set; }
        public string? Image3 { get; set; }
        public string? Description { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}

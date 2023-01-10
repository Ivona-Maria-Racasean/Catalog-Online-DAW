namespace Catalog_Online.Models.Entities
{
    public class Message
    {
        public Message() { }
        public int Id { get; set; }
        public int SecretaryId { get; set; }
        public int TeacherId { get; set; }
        public int MessageNumber { get; set; }
        public string Content { get; set; }
    }
}

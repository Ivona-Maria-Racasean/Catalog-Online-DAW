namespace Catalog_Online.Models.Dtos
{
    public class TeacherMessagesDto
    {
        public int Id { get; set; }
        public Secretary Sender { get; set; }
        public int MessageNumber { get; set; }
        public string Content { get; set; }

        public class Secretary
        {
            public int Id { get; set; }
            public string Name { get; set; }
        }

    }
}

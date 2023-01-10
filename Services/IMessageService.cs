using Catalog_Online.Models.Dtos;
using Catalog_Online.Models.Entities;
using System.Collections.Generic;

namespace Catalog_Online.Services
{
    public interface IMessageService
    {
        public Message SendMessage(Message dto);

        public int GetLatestMessageNumber(int teacherId, int secretaryId);
        public List<Message> GetMessagesByTeacherId(int teacherId);
    }
}

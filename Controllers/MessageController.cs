using Catalog_Online.Models.Dtos;
using Catalog_Online.Models.Entities;
using Catalog_Online.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Catalog_Online.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        IMessageService _messageService;

        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpGet("int:id")]
        public ActionResult<List<Message>> GetMessagesByTeacherId(int id)
        {
            var messageList = _messageService.GetMessagesByTeacherId(id);
            return messageList ;
        }

        [HttpPost]
        public ActionResult<Message> SendMessage([FromBody] MessageDto message) 
        {
            Message newMessage = new()
            {
                TeacherId = message.TeacherId,
                SecretaryId = message.SecretaryId,
                Content = message.Content,
                MessageNumber = _messageService.GetLatestMessageNumber(message.TeacherId, message.SecretaryId) + 1
            };

            var result = _messageService.SendMessage(newMessage);
            return Ok(result);

        }
    }
}

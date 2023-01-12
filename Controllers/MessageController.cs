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
        IUserService _userService;

        public MessageController(IMessageService messageService, IUserService userService)  
        {
            _messageService = messageService;
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<List<TeacherMessagesDto>> GetMessagesByTeacherId([FromQuery(Name = "teacherId")] int id)
        {
            var messageList = _messageService.GetMessagesByTeacherId(id);
            var convertedMessageList = new List<TeacherMessagesDto>();

            foreach (var message in messageList)
            {
                var msg = new TeacherMessagesDto();
                msg.Id = message.Id;
                msg.MessageNumber = message.MessageNumber;
                msg.Content = message.Content;

                var sender = new TeacherMessagesDto.Secretary();

                var secretaryData = _userService.GetUserById(message.SecretaryId);
                sender.Id = secretaryData.Id;
                sender.Name = secretaryData.FirstName + ' ' + secretaryData.LastName;
               
                msg.Sender = sender;

                convertedMessageList.Add(msg);

            }

            return convertedMessageList;
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

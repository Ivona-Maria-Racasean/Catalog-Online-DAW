﻿using Catalog_Online.Helper;
using Catalog_Online.Models.Dtos;
using Catalog_Online.Models.Entities;
using Catalog_Online.Services;
using System.Collections.Generic;
using System.Linq;

namespace Catalog_Online.ServicesImpl
{
    public class MessageServiceImpl : IMessageService
    {
        RepositoryContext _context;

        public MessageServiceImpl(RepositoryContext context)
        {
            _context = context;
        }

        public int GetLatestMessageNumber(int teacherId, int secretaryId)
        {
            var teachersMessages = _context.Messages.Where(m => m.TeacherId == teacherId && m.SecretaryId == secretaryId).ToList();
            
            return teachersMessages.Count == 0 
                ? 0 
                : teachersMessages.Count;
        }

        public List<Message> GetMessagesByTeacherId(int teacherId)
        {
            return _context.Messages.Where(ms => ms.TeacherId == teacherId).ToList();
        }

        public Message SendMessage(Message dto)
        {
            var newMessage = _context.Messages.Add(dto);
            _context.SaveChanges();
            return newMessage.Entity;
        }
    }
}

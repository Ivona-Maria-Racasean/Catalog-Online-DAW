using System.Linq;
using Catalog_Online.Helper;
using Catalog_Online.Services;
using Catalog_Online.Models.Entity;
using System.Collections.Generic;
using System;

namespace Catalog_Online.Managers
{
    public class UserServiceImpl : IUserService
    {
        RepositoryContext _context;
        public UserServiceImpl(RepositoryContext context) {
            _context = context;
        }

        public List<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public User GetUserById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        public User GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }

        public User RegisterUser(User user)
        {   
            var newUser = _context.Users.Add(user);
            _context.SaveChanges();
            return newUser.Entity;
        }

        public bool CheckPassword(User user, string password)
        {
            // Ar trebui sa adaugam un fel de cryptare ca sa nu salvam parolele in plain-text (pt mai tarziu)
            if(user.Password == password)
            {
                return true;
            }
            return false;
        }

        public Role GetUserRole(User user)
        {
            return _context.Roles.FirstOrDefault(r => r.Id == user.RoleId);
        }

        public List<User> GetTeachers()
        {
           List<User> users =  _context.Users.ToList();
            List<User> teachers = new List<User>();
            for (int i=0; i< users.Count; i++)
            {
                Role role = GetUserRole(users[i]);
                if(role.Name == "Teacher")
                {
                    teachers.Add(users[i]);
                }

            }

            return teachers;
        }
    }
}

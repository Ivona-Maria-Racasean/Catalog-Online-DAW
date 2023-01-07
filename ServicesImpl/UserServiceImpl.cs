using System.Linq;
using Catalog_Online.Helper;
using Catalog_Online.Services;
using Catalog_Online.Models.Entity;
using System.Collections.Generic;

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

        public User RegisterUser(User user)
        {   
            var newUser = _context.Users.Add(user);
            _context.SaveChanges();
            return newUser.Entity;

        }
    }
}

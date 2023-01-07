using Catalog_Online.Models.Entity;
using System.Collections.Generic;

namespace Catalog_Online.Services
{
    public interface IUserService
    {
        public User RegisterUser(User user);

        public User GetUserById(int id);

        public List<User> GetAllUsers();
    }
}

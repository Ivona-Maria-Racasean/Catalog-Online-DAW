using System.Linq;
using Catalog_Online.Helper;
using Catalog_Online.Services;
using Catalog_Online.Models.Entity;
using System.Collections.Generic;
using System;
using Catalog_Online.Models.Dtos;
using System.Net.Sockets;
using Microsoft.AspNetCore.Identity;

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

        public List<UserRolDto> GetAllUserData()
        {
            List<User> users = _context.Users.ToList();
            List<UserRolDto> usersRol = new List<UserRolDto>();

            for (int i = 0; i < users.Count; i++)
            {
                var RolData = _context.Roles.FirstOrDefault(rd => rd.Id == users[i].RoleId);

                UserRolDto listing = new()
                {
                    RolId = RolData.Id,
                    UserId = users[i].Id,
                    FirstName = users[i].FirstName,
                    LastName = users[i].LastName,
                    Rol = RolData.Name,
                    Email = users[i].Email,
                    Address = users[i].Address,
                    PhoneNumber = users[i].PhoneNumber,


                };

                usersRol.Add(listing);
            }
            return usersRol;
        }

        public List<StudentUserListing> GetAllStudentUsersData()
        {
            List<User> users = _context.Users.ToList();
            List<StudentUserListing> studentUsers = new List<StudentUserListing>();

            for (int i = 0; i < users.Count; i++)
            {
                Role role = GetUserRole(users[i]);
                if (role.Name == "Student")
                {
                    var StudentData = _context.StudentsData.FirstOrDefault(sd => sd.UserId == users[i].Id);
                    StudentUserListing listing = new()
                    {
                        User = users[i],
                        Id = StudentData.Id,
                        UserId = users[i].Id,
                        YearOfStudying = StudentData.YearOfStudying,
                        RegistrationNumber = StudentData.RegistrationNumber,
                        Class = StudentData.Class
                    };

                    studentUsers.Add(listing);
                }
            }
            return studentUsers;
        }

        public List<User> GetTeachers()
        {
            List<User> users = _context.Users.ToList();
            List<User> teachers = new List<User>();
            for (int i = 0; i < users.Count; i++)
            {
                Role role = GetUserRole(users[i]);
                if (role.Name == "Teacher")
                {
                    teachers.Add(users[i]);
                }

            }

            return teachers;
        }
    }
}

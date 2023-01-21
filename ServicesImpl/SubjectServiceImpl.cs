using Catalog_Online.Helper;
using Catalog_Online.Models.Entities;
using Catalog_Online.Models.Entity;
using Catalog_Online.Services;
using Microsoft.VisualBasic;
using System.Collections.Generic;
using System.Linq;

namespace Catalog_Online.ServicesImpl
{
    public class SubjectServiceImpl : ISubjectService
    {
        readonly RepositoryContext _context;

        public SubjectServiceImpl(RepositoryContext context)
        {
            _context = context;
        }

        public Mark AddStudentToSubject(Subject subject, int studentId)
        {
            Mark newMark = new Mark();
            newMark.Value = 0;
            newMark.SubjectId = subject.Id;
            newMark.UserId = studentId;
            var addedMark = _context.Marks.Add(newMark);
            _context.SaveChanges();

            return addedMark.Entity;
        }

        public Subject AddSubject(Subject subject)
        {
            var newSubject = _context.Subjects.Add(subject);
            _context.SaveChanges();
            return newSubject.Entity;
        }

        public void DeleteSubject(Subject subject)
        {
            _context.Subjects.Remove(subject);
            _context.SaveChanges(true);
        }

        public List<Subject> GetAllBySemesterAndYear(string Semester, string Year)
        {
            return _context.Subjects.Where(s => s.Semester == Semester && s.YearOfTeaching.Equals(Year)).ToList(); 
        }


        public List<Subject> GetAllSubjects()
        {
            return _context.Subjects.ToList();
        }

        public SubjectsStudents GetSubjectStudent(Subject subject)
        {
            SubjectsStudents subjectsStudents = new();

            var studentIdsForSubject = _context.Marks.Where(mark => mark.SubjectId == subject.Id).Select(mark => mark.UserId).ToHashSet();
            foreach (var student in _context.Users.Where(user => user.RoleId == 1).ToList())
            {
                if (studentIdsForSubject.Contains(student.Id))
                {
                    subjectsStudents.EnrolledStudents.Add(student);
                }
                else
                {
                    subjectsStudents.MissingStudents.Add(student);
                }
            }
            return subjectsStudents;
        }
    }
}

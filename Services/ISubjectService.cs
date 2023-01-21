using Catalog_Online.Models.Entities;
using Catalog_Online.Models.Entity;
using System.Collections.Generic;
using System.Globalization;

namespace Catalog_Online.Services
{
    public interface ISubjectService
    {
        public Subject AddSubject(Subject subject);

        public List<Subject> GetAllBySemesterAndYear(string Semester, string Year);

        public List<Subject> GetAllSubjects();

        public SubjectsStudents GetSubjectStudent(Subject subject);

        public void DeleteSubject(Subject subject);

        public Mark AddStudentToSubject(Subject subject, int studentId);

    }
}

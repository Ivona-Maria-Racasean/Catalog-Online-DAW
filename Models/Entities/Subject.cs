using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace Catalog_Online.Models.Entity
{
    public class Subject
    {
        public int Id { get; set; }
        public int TeacherId { get; set; }
        public string Name { get; set; }
        public string Semester { get; set; }
        public int YearOfTeaching { get; set; }
        public string TeacherName { get; set; }
    }

    class SubjectComparer : IEqualityComparer<Subject>
    {
        public bool Equals(Subject x, Subject y)
        {
            return x.Id == y.Id && x.TeacherName == y.TeacherName && x.Name == y.Name && x.Semester == y.Semester && x.TeacherId == y.TeacherId && x.YearOfTeaching == y.YearOfTeaching;
        }

        public int GetHashCode([DisallowNull] Subject obj)
        {
            return obj.Id;
        }
    }
}

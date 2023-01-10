namespace Catalog_Online.Models.Dtos
{
    public class MarkSubjectDto
    {
        public int Id { get; set; }
        public int SubjectId { get; set; }
        public float Value { get; set; }
        public string SubjectName { get; set; }
        public string Semester { get; set; }
        public string YearOfTeacher { get; set; }
        public string TeacherName { get; set; }

    }
}

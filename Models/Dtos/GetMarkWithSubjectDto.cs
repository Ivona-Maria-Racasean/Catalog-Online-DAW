namespace Catalog_Online.Models.Dtos
{
    public class GetMarkWithSubjectDto
    {
        public int SubjectId { get; set; }
        public int UserId { get; set; }
        public float Value { get; set; }
        public string SubjectName { get; set; }
        public string Semester { get; set; }
        public int YearOfTeaching { get; set; }
        public string TeacherName { get; set; }
    }
}

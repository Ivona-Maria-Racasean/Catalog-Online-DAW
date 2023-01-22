namespace Catalog_Online.Models.Dtos.Transcript
{
    public class GradedSubjects
    {
        public int Id { get; set; }
        public int TeacherId { get; set; }
        public string Name { get; set; }
        public string Semester { get; set; }
        public int YearOfTeaching { get; set; }
        public string TeacherName { get; set; }
        public float Grade { get; set; }
    }
}

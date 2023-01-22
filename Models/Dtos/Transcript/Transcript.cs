using System.Collections.Generic;

namespace Catalog_Online.Models.Dtos.Transcript
{
    public class Transcript
    {
        public Transcript() {
            FirstYearSubjects = new();
            SecondYearSubjects= new();
            ThirdYearSubjects= new();
            FourthYearSubjects= new();
            
            MeanGrade = 0.0f;
            MeanGradeFirstYear= 0.0f;
            MeanGradeSecondYear= 0.0f;
            MeanGradeThirdYear= 0.0f;
            MeanGradeFourthYear= 0.0f;
        }
        
        public List<GradedSubjects> FirstYearSubjects { get; set; }
        public List<GradedSubjects> SecondYearSubjects { get; set; }
        public List<GradedSubjects> ThirdYearSubjects { get; set; }
        public List<GradedSubjects> FourthYearSubjects { get; set; }
        public EnrolmentData EnrolmentData { get; set; }
        public float MeanGradeFirstYear { get; set; }
        public float MeanGradeSecondYear { get; set; }
        public float MeanGradeThirdYear { get; set; }
        public float MeanGradeFourthYear { get; set; }
        public float MeanGrade { get; set; }
    }
}

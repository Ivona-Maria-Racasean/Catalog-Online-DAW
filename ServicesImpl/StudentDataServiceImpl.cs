using Catalog_Online.Helper;
using Catalog_Online.Models.Dtos.Transcript;
using Catalog_Online.Models.Entity;
using Catalog_Online.Services;
using System.Linq;

namespace Catalog_Online.ServicesImpl
{
    public class StudentDataServiceImpl : IStudentDataService
    {
        RepositoryContext _context;

        public StudentDataServiceImpl(RepositoryContext context)
        {
            _context = context;
        }

        public StudentData AddStudentData(StudentData studentData)
        {
            var newStudentData = _context.StudentsData.Add(studentData);   
            _context.SaveChanges();
            return newStudentData.Entity;
        }

        public StudentData GetByUserId(int id)
        {
            return _context.StudentsData.FirstOrDefault(sd => sd.UserId == id);
        }

        public Transcript GetCurrentStudentsTranscript(User student)
        {
            var transcript = new Transcript();

            var studentData = _context.StudentsData.FirstOrDefault(sd => sd.UserId == student.Id);
            var enrolmentData = new EnrolmentData();
            enrolmentData.YearOfStudying = studentData.YearOfStudying;
            enrolmentData.RegistrationNumber = studentData.RegistrationNumber;
            enrolmentData.Class = studentData.Class;

            transcript.EnrolmentData = enrolmentData;

            var marks = _context.Marks.Where(m => m.UserId == student.Id).ToList();
            var markedSubjectIds = marks.Select(m => m.SubjectId).ToHashSet(); 
            var subjects = _context.Subjects.Where(s => markedSubjectIds.Contains(s.Id)).ToList();

            foreach (var subject in subjects)
            {
                var gradedSubject = new GradedSubjects();
                gradedSubject.Id = subject.Id;
                gradedSubject.Name = subject.Name;
                gradedSubject.TeacherName = subject.TeacherName;
                gradedSubject.TeacherId = subject.Id;
                gradedSubject.Semester =subject.Semester;
                gradedSubject.YearOfTeaching= subject.YearOfTeaching;
                gradedSubject.Grade = marks.FirstOrDefault(m => m.SubjectId== subject.Id).Value;

                switch (gradedSubject.YearOfTeaching)
                {
                    case 1:
                        transcript.FirstYearSubjects.Add(gradedSubject);
                        break;
                    case 2:
                        transcript.SecondYearSubjects.Add(gradedSubject);
                        break;
                    case 3:
                        transcript.ThirdYearSubjects.Add(gradedSubject);
                        break;
                    case 4: 
                        transcript.FourthYearSubjects.Add(gradedSubject);
                        break;
                }
            }

            var firstYearGrades = transcript.FirstYearSubjects.Where(grade => grade.Grade != 0).Select(grade => grade.Grade).ToList();
            var secondYearGrades = transcript.SecondYearSubjects.Where(grade => grade.Grade != 0).Select(grade => grade.Grade).ToList();
            var thirdYearGrades = transcript.ThirdYearSubjects.Where(grade => grade.Grade != 0).Select(grade => grade.Grade).ToList();
            var fourthYearGrades = transcript.FourthYearSubjects.Where(grade => grade.Grade != 0).Select(grade => grade.Grade).ToList();

            transcript.MeanGradeFirstYear = firstYearGrades.Count > 0 ? firstYearGrades.Average() : 0;
            transcript.MeanGradeSecondYear = secondYearGrades.Count > 0 ? secondYearGrades.Average() : 0;
            transcript.MeanGradeThirdYear = thirdYearGrades.Count > 0 ? thirdYearGrades.Average() : 0  ;
            transcript.MeanGradeFourthYear = fourthYearGrades.Count > 0 ? fourthYearGrades.Average() : 0;

            transcript.MeanGrade = (transcript.MeanGradeFirstYear + transcript.MeanGradeSecondYear + transcript.MeanGradeThirdYear + transcript.MeanGradeFourthYear) / 4;

            return transcript;
        }

        public StudentData UpdateStudentData(StudentData newStudentData, int id)
        {
            var originalStudentData = _context.StudentsData.FirstOrDefault(sd => sd.Id == id);
            if (originalStudentData == null) return null;

            originalStudentData.Id = newStudentData.Id;
            originalStudentData.RegistrationNumber = newStudentData.RegistrationNumber; 
            originalStudentData.YearOfStudying = newStudentData.YearOfStudying;
            originalStudentData.UserId = newStudentData.UserId; 
            originalStudentData.Class = newStudentData.Class;   

            _context.SaveChanges();
            return originalStudentData;
        }
    }
}

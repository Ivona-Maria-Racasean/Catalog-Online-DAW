import { EnrolmentData } from "./enrolmentData.model";
import { GradedSubject } from "./gradedSubject.model";

export interface Transcript{
    firstYearSubjects: GradedSubject[],
    secondYearSubjects: GradedSubject[],
    thirdYearSubjects: GradedSubject[],
    fourthYearSubjects: GradedSubject[],
    enrolmentData: EnrolmentData,
    meanGradeFirstYear: number,
    meanGradeSecondYear: number,
    meanGradeThirdYear: number,
    meanGradeFourthYear: number,
    meanGrade: number
}
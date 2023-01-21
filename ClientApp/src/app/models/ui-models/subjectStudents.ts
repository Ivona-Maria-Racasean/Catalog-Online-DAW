import { User } from "./user.model";

export interface SubjectStudents{
    enrolledStudents: User[]
    missingStudents: User[]
}
import { Teacher } from "./teacher.model";

export interface Subject {
  id: string,
  teacherId: string,
  name: string,
  semester: string,
  yearOfTeaching: string,
  teacherName: string,
}

import { User } from "./user.model";

export interface StudentData {
  id: string,
  userId: string,
  yearOfStudying: string,
  registrationNumber: string,
  class: string,
  user: User
}

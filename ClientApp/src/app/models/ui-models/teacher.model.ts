import { User } from "./user.model";

export interface Teacher {
  id: string,
  userId: string,
  title: string,
  user: User
}

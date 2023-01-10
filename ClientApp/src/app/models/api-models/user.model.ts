import { Rol } from "./rol.model";

export interface User {
  id: string,
  reload: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  address: string,
  phoneNumber: string,
  roles: string;
  rol: Rol,
}

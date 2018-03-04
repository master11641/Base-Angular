import { Role } from "app/user-operations/Models/Role.";

export class User {
  ID: number;
  FullName: string;
  Email: string;
  Password: string;
  Roles: Role[];
}

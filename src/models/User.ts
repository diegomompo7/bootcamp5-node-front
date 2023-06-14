import { ClassroomResponse } from "./Classrom";

export enum ROL {
  "STUDENT" = "STUDENT",
  "TEACHER" = "TEACHER",
  "PARENT" = "PARENT",
  "ADMIN" = "ADMIN",
}

export interface UserCreate {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  classroom?: string;
  children?: UserCreate[];
  rol: ROL;
}

export interface UserResponse {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  classroom: ClassroomResponse;
  children?: UserCreate[];
  rol: ROL;
}

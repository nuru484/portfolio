// src/types/user.types.ts

export interface IUser {
  id: string;
  email: string;
  fullname: string;
  phone: string | null;
  isAdmin: boolean;
  twoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

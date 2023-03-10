import { Schema, model } from 'mongoose';
import { IUser } from '@src/types/types';

const users = new Schema<IUser>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
})

export const Users = model<IUser>('user', users)
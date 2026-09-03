import { models, Schema, model, Document } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password?: string;
  image?: string;
  role: string;
  isActive: boolean;
  lastLogin?: Date;
}

export interface IUserDoc extends IUser, Document {}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    lastLogin: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true },
);

const User = models?.User || model<IUser>("User", userSchema);
export default User;

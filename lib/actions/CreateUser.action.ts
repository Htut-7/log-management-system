"use server";

import dbConnect from "@/database/dbConnect";
import validateBody from "../validateBody";
import UserSchema from "../schema/UserSchema";
import { actionError } from "../response";
import User from "@/database/models/user.model";

export async function CreateUser(params: {
  username: string;
  email: string;
  password?: string;
  image?: string;
  role: string;
  isActive: boolean;
  lastLogin?: Date;
}): Promise<{
  success: boolean;
  message: string;
}> {
  await dbConnect();
  const validatedData = validateBody(params, UserSchema);
  const { username, email, password, image, role, isActive, lastLogin } =
    validatedData.data;

  try {
    await User.create({
      username,
      email,
      password,
      image,
      role,
      isActive,
      lastLogin,
    });

    return {
      success: true,
      message: "User create successfully",
    };
  } catch (e) {
    return actionError(e);
  }
}

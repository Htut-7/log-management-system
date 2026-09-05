"use server";

import dbConnect from "@/database/dbConnect";
import validateBody from "../validateBody";
import UpdateUserSchema from "../schema/UpdateUserSchema";
import User, { IUser } from "@/database/models/user.model";
import { actionError } from "../response";

export async function UpdateUser(params: {
  userId: string;
  username?: string;
  email?: string;
  password?: string;
  image?: string;
  role?: string;
  isActive?: boolean;
  lastLogin?: Date;
}): Promise<{
  success: boolean;
  data?: IUser;
}> {
  await dbConnect();
  const validatedData = validateBody(params, UpdateUserSchema);
  const {
    userId,
    username,
    email,
    password,
    image,
    role,
    isActive,
    lastLogin,
  } = validatedData.data;

  try {
    const newUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        email,
        password,
        image,
        role,
        isActive,
        lastLogin,
      },
      { new: true },
    );

    if (!newUser) {
      throw new Error("User not found");
    }

    return {
      success: true,
      data: newUser,
    };
  } catch (e) {
    return actionError(e);
  }
}

"use server";

import dbConnect from "@/database/dbConnect";
import { actionError } from "../response";
import User from "@/database/models/user.model";
import validateBody from "../validateBody";
import GetUsersSchema from "../schema/GetUsersSchema";

export async function GetUsers() {
  await dbConnect();

  try {
    const users = await User.find();

    return {
      success: true,
      data: users,
    };
  } catch (e) {
    return actionError(e);
  }
}

export async function GetUserById(params: { userId: string }) {
  await dbConnect();

  const validatedData = validateBody(params, GetUsersSchema);
  const { userId } = validatedData.data;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      success: true,
      data: user,
    };
  } catch (e) {
    return actionError(e);
  }
}

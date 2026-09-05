"use server";

import dbConnect from "@/database/dbConnect";
import { actionError } from "../response";
import User from "@/database/models/user.model";

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

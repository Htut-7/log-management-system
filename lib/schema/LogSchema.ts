import z from "zod";
import { Types } from "mongoose";

const LogSchema = z.object({
  user: z.instanceof(Types.ObjectId),
  status: z.string(),
  action: z.string(),
  message: z.string(),
});

export default LogSchema;

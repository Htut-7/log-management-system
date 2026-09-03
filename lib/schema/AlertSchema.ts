import { Types } from "mongoose";
import z from "zod";

const AlertSchema = z.object({
  user: z.instanceof(Types.ObjectId).optional(),
  rule: z.instanceof(Types.ObjectId),
  severity: z.string(),
  title: z.string(),
  message: z.string(),
  status: z.string(),
  log: z.instanceof(Types.ObjectId).optional(),
});

export default AlertSchema;

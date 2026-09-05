import { Types } from "mongoose";
import z from "zod";

const UpdateAlertSchema = z.object({
  alertId: z.string(),
  user: z.instanceof(Types.ObjectId).optional(),
  rule: z.instanceof(Types.ObjectId).optional(),
  severity: z.string().optional(),
  title: z.string().optional(),
  message: z.string().optional(),
  status: z.string().optional(),
  log: z.instanceof(Types.ObjectId).optional(),
});

export default UpdateAlertSchema;

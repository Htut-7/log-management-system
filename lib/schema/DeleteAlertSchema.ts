import z from "zod";

const DeleteAlertSchema = z.object({
  alertId: z.string(),
});

export default DeleteAlertSchema;

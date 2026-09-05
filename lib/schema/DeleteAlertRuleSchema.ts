import z from "zod";

const DeleteAlertRuleSchema = z.object({
  alertRuleId: z.string(),
});

export default DeleteAlertRuleSchema;

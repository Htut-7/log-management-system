import z from "zod";

const UpdateAlertRuleSchema = z.object({
  alertRuleId: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  event: z.string().optional(),
  threshold: z.number().optional(),
  timeWindow: z.number().optional(),
  severity: z.string().optional(),
  isActive: z.boolean().optional(),
});

export default UpdateAlertRuleSchema;

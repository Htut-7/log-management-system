import z from "zod";

const AlertRuleSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  event: z.string(),
  threshold: z.number(),
  timeWindow: z.number(),
  severity: z.string(),
  isActive: z.boolean(),
});

export default AlertRuleSchema;

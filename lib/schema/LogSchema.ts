import z from "zod";

const LogSchema = z.object({
  timestamp: z.coerce.date(),
  tenant: z.string(),
  source: z.string(),
  vendor: z.string().optional(),
  product: z.string().optional(),
  eventType: z.string(),
  eventSubtype: z.string().optional(),
  severity: z.number().min(0).max(10).optional(),
  action: z.string().optional(),
  srcIp: z.string().optional(),
  srcPort: z.number().optional(),
  dstIp: z.string().optional(),
  dstPort: z.number().optional(),
  protocol: z.string().optional(),
  user: z.string().optional(),
  host: z.string().optional(),
  process: z.string().optional(),
  url: z.string().optional(),
  httpMethod: z.string().optional(),
  statusCode: z.number().optional(),
  ruleName: z.string().optional(),
  ruleId: z.string().optional(),
  raw: z.unknown().optional(),
  tags: z.array(z.string()).optional(),
});

export default LogSchema;

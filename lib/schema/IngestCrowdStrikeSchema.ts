import z from "zod";

const IngestCrowdStrikeSchema = z.object({
  tenant: z.string(),
  source: z.string(),
  event_type: z.string(),
  host: z.string(),
  process: z.string(),
  severity: z.number().min(0).max(10),
  sha256: z.string(),
  action: z.string(),
  "@timestamp": z.coerce.date(),
});

export default IngestCrowdStrikeSchema;

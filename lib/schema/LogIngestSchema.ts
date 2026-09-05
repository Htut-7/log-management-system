import z from "zod";

const LogIngestSchema = z.object({
  tenant: z.string(),
  source: z.string(),
  data: z.unknown(),
});

export default LogIngestSchema;

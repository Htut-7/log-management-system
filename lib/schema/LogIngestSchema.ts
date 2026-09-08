import z from "zod";

const LogIngestSchema = z.object({
  source: z.string(),
  data: z.unknown(),
});

export default LogIngestSchema;

import z from "zod";

const BatchIngestionSchema = z.object({
  tenant: z.string(),
  source: z.string(),
  data: z.array(z.unknown()),
});

export default BatchIngestionSchema;

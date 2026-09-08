import z from "zod";

const BatchIngestionSchema = z.object({
  source: z.string(),
  data: z.array(z.unknown()),
});

export default BatchIngestionSchema;

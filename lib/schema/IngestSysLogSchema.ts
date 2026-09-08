import z from "zod";

const IngestSysLogSchema = z.object({
  source: z.string(),
  message: z.string(),
});

export default IngestSysLogSchema;

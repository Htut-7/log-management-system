import z from "zod";

const IngestSysLogSchema = z.object({
  tenant: z.string(),
  source: z.string(),
  message: z.string(),
});

export default IngestSysLogSchema;

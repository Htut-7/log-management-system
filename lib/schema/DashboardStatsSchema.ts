import z from "zod";

const DashboardStatsSchema = z.object({
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
});

export default DashboardStatsSchema;

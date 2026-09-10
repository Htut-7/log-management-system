import z from "zod";

const DashboardStatsSchema = z.object({
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  source: z.enum(["api", "aws", "ad", "firewall"]).optional(),
});

export default DashboardStatsSchema;

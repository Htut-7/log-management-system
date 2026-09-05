import z from "zod";

const GetUsersSchema = z.object({
  userId: z.string(),
});

export default GetUsersSchema;

import z from "zod";

const UpdateUserSchema = z.object({
  userId: z.string(),
  username: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  image: z.string().optional(),
  role: z.string().optional(),
  isActive: z.boolean().optional(),
  lastLogin: z.date().optional(),
});

export default UpdateUserSchema;

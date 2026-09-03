import z from "zod";

const UserSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string().optional(),
  image: z.string().optional(),
  role: z.string(),
  isActive: z.boolean(),
  lastLogin: z.date().optional(),
});

export default UserSchema;

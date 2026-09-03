import { ZodObject, ZodSchema, ZodType, ZodError } from "zod";

const validateBody = (
  body: unknown,
  Schema: ZodObject,
  partial: boolean = false,
) => {
  const validatedData = partial
    ? Schema.partial().safeParse(body)
    : Schema.safeParse(body);

  if (!validatedData.success) {
    throw new ZodError(validatedData.error.issues);
  }
  return validatedData;
};

export default validateBody;

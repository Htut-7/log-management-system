import dbConnect from "@/database/dbConnect";
import validateBody from "../validateBody";
import Log, { ILog } from "@/database/models/log.model";
import LogSchema from "../schema/LogSchema";

export async function CreateIngestedLog(
  params: Omit<ILog, "tenant">,
  tenant: string,
) {
  await dbConnect();

  const validatedData = validateBody(params, LogSchema);

  await Log.create({
    ...validatedData.data,
    tenant,
  });

  return {
    success: true,
    message: "Log created successfully.",
  };
}

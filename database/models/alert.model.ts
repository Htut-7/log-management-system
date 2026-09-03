import { model, models, Schema, Types, Document } from "mongoose";

export interface IAlert {
  user?: Types.ObjectId;
  rule: Types.ObjectId;
  severity: string;
  title: string;
  message: string;
  status: string;
  log?: Types.ObjectId;
}

export interface IAlertDoc extends IAlert, Document {}

const alertSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    rule: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AlertRule",
    },
    severity: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    log: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Log",
    },
  },
  { timestamps: true },
);

const Alert = models?.Alert || model<IAlert>("Alert", alertSchema);
export default Alert;

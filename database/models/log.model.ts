import { Schema, Types, model, models, Document } from "mongoose";

export interface ILog {
  user?: Types.ObjectId;
  action: string;
  resource?: string;
  resourceId?: Types.ObjectId;
  status: string;
  message?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata: Record<string, unknown>;
}

export interface ILogDoc extends ILog, Document {}

const logSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    action: {
      type: String,
      required: true,
    },
    resource: {
      type: String,
      required: false,
    },
    resourceId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
    ipAddress: {
      type: String,
      required: false,
    },
    userAgent: {
      type: String,
      required: false,
    },
    metadata: {
      type: Schema.Types.Mixed,
      required: false,
    },
  },
  { timestamps: true },
);

const Log = models?.Log || model<ILog>("Log", logSchema);
export default Log;

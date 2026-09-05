import { Schema, model, models, Document } from "mongoose";

export interface ILog {
  timestamp: Date;
  tenant: string;
  source: string;
  vendor?: string;
  product?: string;
  eventType: string;
  eventSubtype?: string;
  severity?: number;
  action?: string;
  srcIp?: string;
  srcPort?: number;
  dstIp?: string;
  dstPort?: number;
  protocol?: string;
  user?: string;
  host?: string;
  process?: string;
  url?: string;
  httpMethod?: string;
  statusCode?: number;
  ruleName?: string;
  ruleId?: string;
  raw?: unknown;
  tags?: string[];
}

export interface ILogDoc extends ILog, Document {}

const logSchema = new Schema(
  {
    timestamp: {
      type: Date,
      required: true,
    },
    tenant: {
      type: String,
      required: true,
      index: true,
    },
    source: {
      type: String,
      required: true,
      index: true,
    },
    vendor: {
      type: String,
      required: false,
    },
    product: {
      type: String,
      required: false,
    },
    eventType: {
      type: String,
      required: true,
      index: true,
    },
    eventSubtype: {
      type: String,
      required: false,
    },
    severity: {
      type: Number,
      required: false,
    },
    action: {
      type: String,
      required: false,
    },
    srcIp: {
      type: String,
      required: false,
      index: true,
    },
    srcPort: {
      type: Number,
      required: false,
    },
    dstIp: {
      type: String,
      required: false,
      index: true,
    },
    dstPort: {
      type: Number,
      required: false,
    },
    protocol: {
      type: String,
      required: false,
    },
    user: {
      type: String,
      required: false,
      index: true,
    },
    host: {
      type: String,
      required: false,
      index: true,
    },
    process: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
    httpMethod: {
      type: String,
      required: false,
    },
    statusCode: {
      type: Number,
      required: false,
    },
    ruleName: {
      type: String,
      required: false,
    },
    ruleId: {
      type: String,
      required: false,
    },
    raw: {
      type: Schema.Types.Mixed,
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true },
);

const Log = models?.Log || model<ILog>("Log", logSchema);

export default Log;

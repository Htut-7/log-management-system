import { Schema, Document, models, model } from "mongoose";

export interface IAlertRule {
  name: string;
  description?: string;
  event: string;
  threshold: number;
  timeWindow: number;
  severity: string;
  isActive: boolean;
}

export interface IAlertRuleDoc extends IAlertRule, Document {}

const alertRulesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    event: {
      type: String,
      required: true,
    },
    threshold: {
      type: Number,
      required: true,
    },
    timeWindow: {
      type: Number,
      required: true,
    },
    severity: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

const AlertRule =
  models?.AlertRule || model<IAlertRule>("AlertRule", alertRulesSchema);
export default AlertRule;

import { Schema, model, type Document, Types } from "mongoose";

export interface IOrder extends Document {
  orderNumber: string;
  userId?: Types.ObjectId;
  items: {
    menuItemId: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    customizations: Record<string, string>;
  }[];
  orderType: "dine-in" | "takeaway" | "delivery";
  tableNumber?: string;
  deliveryAddress?: {
    street: string;
    city: string;
    postcode: string;
  };
  pickupTime?: Date;
  subtotal: number;
  serviceCharge: number;
  deliveryFee: number;
  total: number;
  paymentStatus: "pending" | "paid" | "failed";
  paymentMethod: string;
  orderStatus: "received" | "preparing" | "ready" | "delivered" | "cancelled";
  specialInstructions?: string;
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    userId:      { type: Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        menuItemId:     { type: Schema.Types.ObjectId, ref: "MenuItem", required: true },
        name:           { type: String, required: true },
        price:          { type: Number, required: true },
        quantity:       { type: Number, required: true, min: 1 },
        customizations: { type: Schema.Types.Mixed, default: {} },
      },
    ],
    orderType:   { type: String, enum: ["dine-in", "takeaway", "delivery"], required: true },
    tableNumber: { type: String },
    deliveryAddress: {
      street:   { type: String },
      city:     { type: String },
      postcode: { type: String },
    },
    pickupTime:     { type: Date },
    subtotal:       { type: Number, required: true },
    serviceCharge:  { type: Number, default: 0 },
    deliveryFee:    { type: Number, default: 0 },
    total:          { type: Number, required: true },
    paymentStatus:  { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    paymentMethod:  { type: String, required: true },
    orderStatus: {
      type: String,
      enum: ["received", "preparing", "ready", "delivered", "cancelled"],
      default: "received",
    },
    specialInstructions: { type: String },
    contactInfo: {
      name:  { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
  { timestamps: true }
);

OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ userId: 1, createdAt: -1 });
OrderSchema.index({ orderStatus: 1 });

export default model<IOrder>("Order", OrderSchema);

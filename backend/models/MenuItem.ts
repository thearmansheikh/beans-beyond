import { Schema, model, type Document } from "mongoose";

export interface IMenuItem extends Document {
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  dietaryInfo: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    allergens: string[];
  };
  available: boolean;
  popular: boolean;
  customizationOptions: {
    name: string;
    options: string[];
    additionalPrice: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name:        { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category:    { type: String, required: true },
    price:       { type: Number, required: true, min: 0 },
    imageUrl:    { type: String, default: "" },
    dietaryInfo: {
      vegetarian: { type: Boolean, default: false },
      vegan:      { type: Boolean, default: false },
      glutenFree: { type: Boolean, default: false },
      allergens:  [{ type: String }],
    },
    available: { type: Boolean, default: true },
    popular:   { type: Boolean, default: false },
    customizationOptions: [
      {
        name:            { type: String },
        options:         [{ type: String }],
        additionalPrice: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

MenuItemSchema.index({ category: 1, available: 1 });
MenuItemSchema.index({ name: "text", description: "text" });

export default model<IMenuItem>("MenuItem", MenuItemSchema);

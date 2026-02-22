import { Schema, model, type Document, Types } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  addresses: {
    street: string;
    city: string;
    postcode: string;
    isDefault: boolean;
  }[];
  orderHistory: Types.ObjectId[];
  favoriteItems: Types.ObjectId[];
  dietaryPreferences: string[];
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name:  { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String },
    addresses: [
      {
        street:    { type: String },
        city:      { type: String },
        postcode:  { type: String },
        isDefault: { type: Boolean, default: false },
      },
    ],
    orderHistory:        [{ type: Schema.Types.ObjectId, ref: "Order"    }],
    favoriteItems:       [{ type: Schema.Types.ObjectId, ref: "MenuItem" }],
    dietaryPreferences:  [{ type: String }],
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

// Hash password before save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

// Never return password in JSON
UserSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

export default model<IUser>("User", UserSchema);

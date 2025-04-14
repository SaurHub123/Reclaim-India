import mongoose, { Schema, Document } from 'mongoose';

export enum CountryEnum {
  INDIA = 'India',
  USA = 'USA',
  CANADA = 'Canada',
  // Add more as needed
}

export interface IUser extends Document {
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  phone: string;
  country: CountryEnum;
  state: string;
  dist: string;
  landmark: string;
  houseNo: string;
  alternateNumber?: string;
  walletId: string;
  ActivityFlag: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    country: {
      type: String,
      enum: Object.values(CountryEnum),
      default: CountryEnum.INDIA,
      required: true,
    },
    state: { type: String, required: true },
    dist: { type: String, required: true },
    landmark: { type: String, required: true },
    houseNo: { type: String, required: true },
    alternateNumber: { type: String },
    walletId: { type: String, required: true, unique: true },
    ActivityFlag: { type: Boolean, default: true },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

export const User = mongoose.model<IUser>('User', userSchema);

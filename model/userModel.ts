import { model } from "mongoose";
import { Document, Schema, Types } from "mongoose";

interface iUser {
  fullName: string;
  email: string;
  address: string;
  password: string;
  bio: string;
  token: string;
  phone: string;
  avatar: string;
  avatarID: string;
  verify: boolean;

  blog: Array<{}>;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    token: {
      type: String,
    },
    address: {
      type: String,
    },
    verify: {
      type: Boolean,
    },
    password: {
      type: String,
    },
    bio: {
      type: String,
    },
    phone: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    blog: [
      {
        type: Types.ObjectId,
        ref: "blogs",
      },
    ],
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);

import { model } from "mongoose";
import { Document, Schema, Types } from "mongoose";

interface iBlog {
  authorName: string;
  title: string;
  category: string;
  content: string;
  displayImage: string;
  displaImageID: string;

  user: {};
}

interface iBlogData extends iBlog, Document {}

const blogModel = new Schema<iBlogData>(
  {
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    displayImage: {
      type: String,
    },
    displaImageID: {
      type: String,
    },
    user: {
      types: Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default model<iBlogData>("blogs", blogModel);

import mongoose, { Schema, Document } from "mongoose";

export interface Post extends Document {
  title: string;
  content: string;
  categories: { type: mongoose.Schema.Types.ObjectId; ref: "Category" };
  user: { type: mongoose.Schema.Types.ObjectId; ref: "User" };
}

const postSchema: Schema<Post> = new Schema<Post>({
  title: {
    type: String,
    required: [true, "Provide a title"],
  },
  content: {
    type: String,
    required: [true, "No content Provide"],
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const postModel = mongoose.model<Post>("Post", postSchema);

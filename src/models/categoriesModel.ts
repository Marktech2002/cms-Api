import mongoose, { Document, Schema } from "mongoose";

export interface Category extends Document {
  name: string;
}

const categorySchema: Schema<Category> = new Schema<Category>({
  name: {
    type: String,
    required: [true, "Provide a category "],
  },
});

export const categoryModel = mongoose.model<Category>(
  "Category",
  categorySchema
);

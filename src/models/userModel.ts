import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  user_uuid: String;
  email: String;
  password: String;
  googleId?: string;
  facebookId?: string;
  twitterId?: string;
}

const userSchema: Schema<User> = new Schema<User>({
  user_uuid: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (str: string) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
  googleId: {
    type: String,
    unique: true,
  },
  facebookId: {
    type: String,
    unique: true,
  },
  twitterId: {
    type: String,
    unique: true,
  },
});

export const UserModel = mongoose.model<User>("User", userSchema);

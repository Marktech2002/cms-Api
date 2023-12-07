import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

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
    default: uuidv4, // Assigns a UUID v4 by default when a new user is created
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

import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import passport from "passport";
import Jwt from "jsonwebtoken";
import "dotenv/config";
import { User, UserModel } from "../models/userModel";
import { logger } from "./logger";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: process.env.callbackURL!,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (err: any, user?: any) => void
    ) => {
      try {
        const newUser = {
          googleId: profile.id,
          email: profile.emails![0].value,
        };
        let user = await UserModel.findOne({ googleId: profile.id });
        console.log(profile);
        if (!user) {
          user = await UserModel.create(newUser);
        }

        if (user) {
          const token = generateToken(user.user_uuid);
          console.log(token)
          done(null, { user, token });
        } else {
          done(new Error("Failed to create/find user."));
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await UserModel.findById(id).exec();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

const generateToken = (id: any): any => {
  return Jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

import { Response, Request } from "express";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel  , User} from "../models/userModel";
import { logger } from "../util/logger";
import { signUpschema , loginSchema , UpdateUserSchema , getUserSchema } from "../validation/uservalid";
import { STATUS_CODES } from "../util/statuscode";


/**
 * Register new user
 * @desc register new user  
   @route POST nkunzi/user/register
   @access Public
 * @param req 
 * @param res 
 * @returns Response
 */

   export const registerUser = async (req: Request, res: Response, next: any) => {
    logger.info("calling registerUser");
    const { email, password } = req.body;
    const { error } = signUpschema.validate(req.body);
    if (error) {
      return res.status(STATUS_CODES.INVALID).json({
        success: false,
        message: error.details[0].message.replace(/"|'/g, ""),
        status: "Invalid",
      });
    }
    logger.info("validation passed..");
  
    const userExits = await UserModel.findOne({ email });
    if (userExits) {
      return res.status(STATUS_CODES.INVALID).json({
        success: false,
        message: "User Already exists",
        status: "Invalid",
      });
    }
  
    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const user = await UserModel.create({
        email,
        password: hashedPassword,
      });
      logger.info("User created..");
      if (user) {

        return res.status(STATUS_CODES.CREATED).json({
          success: true,
          message: "User created successfully",
          _id: user.id,
          email: user.email,
          token: generateToken(user._id),
        });
      }
    } catch (error) {
      logger.error(error);
      return res.status(STATUS_CODES.SERVER_ERROR).json({
        success: false,
        message: "Failed to create user",
      });
    }
  };
  
  /**
   *login new user
   * @desc login  user  
     @route POST /nkunzi/user/login
     @access Public
   * @param req 
   * @param res 
   * @returns Response
   */
  export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(STATUS_CODES.INVALID).json({
        success: false,
        message: error.details[0].message.replace(/"|'/g, ""),
        status: "Invalid",
      });
    }
    const user = await UserModel.findOne({ email });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(STATUS_CODES.CREATED).json({
        _id: user.id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res.status(STATUS_CODES.INVALID).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  };
  
  /**
   *Get a new user
   * @desc Get user  
     @route POST /nkunzi/user/me
     @access Private 
   * @param req 
   * @param res 
   * @returns Response
   */
  
  export const getUser = async (req: Request, res: Response) => {
    logger.info("gettng user ");
    const { id } = req.body.user;
    try {
      const user = await UserModel.findOne({ _id: id });
      if (!user) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
          success: false,
          message: "User Not Found",
          status: "Invalid",
        });
      }
      return res.status(STATUS_CODES.CREATED).json({
        succcess: true,
        message: "User Found",
        user,
      });
    } catch (error) {
      logger.error(error);
      return res.status(STATUS_CODES.SERVER_ERROR).json({
        err: error,
        message: "Server error",
        success: false,
      });
    }
  };
  
  /**
   * ? Update user credentials 
   * @desc register new user  
     @route POST nkunzi/user/register
     @access Public
   * @param req 
   * @param res 
   * @returns Response
   */

  
  /**
   *?Jwt
   * @desc  Generate jwt token  
     @access Private
   * @param id : string
   * @returns token : string
   */
  const generateToken = (id: string): any => {
    return Jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  }; 
  
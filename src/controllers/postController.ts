import express, { Request, Response } from "express";
import { postModel, Post } from "../models/postModel";
import { logger } from "../util/logger";
import { STATUS_CODES } from "../util/statuscode";

/**
 * ? Create a new Post 
 * @desc  new post
   @route POST api/v1/post/create
   @access Public
 * @param req 
 * @param res 
 * @returns Response
 */
export const createPost = async (req: Request, res: Response, next: any) => {
  try {
    const { title, content, categories, user } = req.body as Post;
    const newPost = await postModel.create({
      title,
      content,
      categories,
      user,
    });
    logger.info("new Post created");
    return res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "Created successfully",
      data: newPost,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
/**
 * ? Edit a Post 
 * @desc  edit post
   @route POST api/v1/post/edit/:id
   @access Public
 * @param req 
 * @param res 
 * @returns Response
 */
export const editPost = async (req: Request, res: Response, next: any) => {
  try {
    const { id } = req.params;
    const { title, content, categories, user } = req.body as Post;
    const postToUpdate = await postModel.findById(id);
    if (!postToUpdate) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: true,
        message: "Post not found",
      });
    }
    if (title) {
      postToUpdate.title = title;
    }
    if (content) {
      postToUpdate.content = content;
    }
    if (categories) {
      postToUpdate.categories = categories;
    }
    if (user) {
      postToUpdate.user = user;
    }
    const updatedPost = await postToUpdate.save();
    return res.json(updatedPost).status(STATUS_CODES.SUCCESS);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
/**
 * ? Delete a Post
 * @desc  Delete a post
   @route POST api/v1/post/delete/:id
   @access Public
 * @param req 
 * @param res 
 * @returns Response
 */
export const deleteAPost = async (req: Request, res: Response, next: any) => {
  try {
    const { id } = req.params;
    const deletedPost = await postModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Post not found",
      });
    }
    return res
      .json({
        success: true,
        message: "Post deleted successfully",
        data: deletedPost,
      })
      .status(STATUS_CODES.SUCCESS);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

/**
 * ? Get all Post
 * @desc  All posts
   @route POST api/v1/post/all
   @access Public
 * @param req 
 * @param res 
 * @returns Response
 */
export const allPost = async (req: Request, res: Response, next: any) => {
  try {
    const posts = await postModel.find().sort({ createdAt: -1 });
    return res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "All post successfully fetched",
      data: posts,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

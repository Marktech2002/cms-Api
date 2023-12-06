import express, { Request, Response } from "express";
import { categoryModel, Category } from "../models/categoriesModel";
import { logger } from "../util/logger";
import { STATUS_CODES } from "../util/statuscode";

/**
 * ? Create a new category 
 * @desc  new category
   @route POST api/v1/category/create
   @access Public
 * @param req 
 * @param res 
 * @returns Response
 */
export const createCategory = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const { name } = req.body as Category;
    const newCategory = await categoryModel.create({ name });
    return res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

/**
 * ? All categories
 * @desc  new category
   @route POST api/v1/category/all
   @access Public
 * @param req 
 * @param res 
 * @returns Response
 */
export const allCategory = async (req: Request, res: Response, next: any) => {
  try {
    const categories = await categoryModel.find().sort({ createdAt: -1 });
    return res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Category successfully fetched",
      data: categories,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

/**
 * ? Edit all a category
   @route POST api/v1/category/edit/:id
   @access Public
 * @param req 
 * @param res 
 * @returns Response
 */
export const editCategory = async (req: Request, res: Response, next: any) => {
  try {
    const { id } = req.params;
    const { name } = req.body as Category;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Edited successfully",
      data: updatedCategory,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

/**
 * ? Delete a Category
 * @desc  Delete a category
   @route POST api/v1/category/delete/:id
   @access Public
 * @param req 
 * @param res 
 * @returns Response
 */
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const { id } = req.params;
    const deletedCategory = await categoryModel.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Category deleted successfully",
      data : deletedCategory,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

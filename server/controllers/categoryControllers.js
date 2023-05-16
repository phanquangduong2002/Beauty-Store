import User from "../models/User.js";
import ParentCategory from "../models/ParentCategory.js";
import SubCategory from "../models/SubCategory.js";
import mongoose, { mongo } from "mongoose";

export const createParentCategory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not admin",
      });
    }

    const { name } = req.body;

    if (!name)
      return res.status(400).json({
        success: false,
        message: "Misssing name",
      });

    const newParentCategory = new ParentCategory({ name });

    await newParentCategory.save();

    res.status(200).json({
      success: true,
      parentCategory: newParentCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createSubCategory = async (req, res) => {
  const parentCategoryId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(parentCategoryId)) {
    return res.status(404).json({
      sucess: false,
      message: "Category not found",
    });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not admin",
      });
    }

    const parentCategory = await ParentCategory.findById(parentCategoryId);

    if (!parentCategory)
      return res.status(404).json({
        success: false,
        menubar: "Category not found",
      });
    const newSubCategory = new SubCategory({
      name: req.body.name,
      parentCategory: req.params.id,
    });

    await newSubCategory.save();

    res.status(200).json({
      success: true,
      subCategory: newSubCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

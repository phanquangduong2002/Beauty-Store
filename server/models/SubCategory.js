import mongoose from "mongoose";

const SubCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParentCategory",
    required: true,
  },
});

const subCategory = mongoose.model("SubCategory", SubCategorySchema);

export default subCategory;

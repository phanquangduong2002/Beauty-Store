import mongoose from "mongoose";

const parentCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const ParentCategory = mongoose.model("ParentCategory", parentCategorySchema);

export default ParentCategory;

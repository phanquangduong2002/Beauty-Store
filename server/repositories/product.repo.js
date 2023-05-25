import Product from "../models/product.model.js";

export const updateQtySoldProduct = async ({ productId, quantity }) => {
  const query = { _id: productId },
    updateSet = {
      $inc: { qtySold: +quantity },
    },
    options = { upsert: true, new: true };

  return await Product.updateOne(query, updateSet, options);
};

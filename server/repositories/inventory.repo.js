import Inevntory from "../models/inventory.model.js";

export const reservationInventory = async ({ cartId, productId, quantity }) => {
  const query = { productId, stock: { $gte: quantity } },
    updateSet = {
      $inc: { stock: -quantity },
      $push: {
        reservations: {
          quantity,
          cartId,
          createOn: new Date(),
        },
      },
    },
    options = { upsert: true, new: true };

  return await Inevntory.updateOne(query, updateSet, options);
};

const Order = require("../models/orderModel");

const createOrder = async (user, product, quantity, total) => {
  return await Order.create({
    user,
    product,
    quantity,
    total,
  });
};

const getAllOrders = async () => {
  return await Order.find().populate("user", "name email");
};

module.exports = {
  createOrder,
  getAllOrders,
};

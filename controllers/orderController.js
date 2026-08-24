const orderService = require("../services/orderService");

const createOrder = async (req, res) => {
  try {
    const { user, product, quantity, total } = req.body;
    const order = await orderService.createOrder(
      user,
      product,
      quantity,
      total,
    );

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
};

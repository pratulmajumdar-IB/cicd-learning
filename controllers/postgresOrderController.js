const orderService = require("../services/postgresOrderService");
const { createOrderSchema } = require("../validators/orderValidator");

const getOrderProducts = async (req, res) => {
  try {
    const products = await orderService.getOrderProducts(req.params.id);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch order products",
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const { error, value } = createOrderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }
    const { user_id, items } = value;
    const orderId = await orderService.createOrder(user_id, items);
    res.status(201).json({
      message: "Order created successfully",
      order_id: orderId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create order",
    });
  }
};

module.exports = {
  getOrderProducts,
  createOrder,
};

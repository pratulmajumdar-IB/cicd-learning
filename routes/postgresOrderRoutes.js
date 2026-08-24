const express = require("express");

const orderController = require("../controllers/postgresOrderController");

const router = express.Router();

router.get("/:id/products", orderController.getOrderProducts);
router.post("/", orderController.createOrder);

module.exports = router;

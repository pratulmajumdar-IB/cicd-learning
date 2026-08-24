const pool = require("../config/db");

const getOrderProducts = async (orderId) => {
  const result = await pool.query(
    `
          SELECT
              products.id AS product_id,
              products.name AS product_name,
              products.price,
              order_items.quantity
          FROM order_items
          JOIN products
              ON products.id = order_items.product_id
          WHERE order_items.order_id = $1
          ORDER BY products.id
          `,
    [orderId],
  );

  return result.rows;
};

const createOrder = async (userId, items) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const orderResult = await client.query(
      `
            INSERT INTO orders (user_id)
            VALUES ($1)
            RETURNING id
            `,
      [userId],
    );
    const orderId = orderResult.rows[0].id;
    for (const item of items) {
      await client.query(
        `
                INSERT INTO order_items
                    (order_id, product_id, quantity)
                VALUES
                    ($1, $2, $3)
                `,
        [orderId, item.product_id, item.quantity],
      );
    }
    await client.query("COMMIT");
    return orderId;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  getOrderProducts,
  createOrder,
};

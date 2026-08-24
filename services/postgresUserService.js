const pool = require("../config/db");

const getAllUsers = async () => {
  const result = await pool.query(`
        SELECT
            orders.id AS order_id,
            orders.product,
            orders.amount,
            users.id AS user_id,
            users.name AS user_name,
            users.email AS user_email
        FROM orders
        JOIN users
            ON users.id = orders.user_id
        ORDER BY orders.id
    `);
  return result.rows;
};

module.exports = {
  getAllUsers,
};

const pool = require("../config/db");

const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `
            SELECT id, name, email, age, role
            FROM users
            ORDER BY id
            `,
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

module.exports = {
  getUsers,
};

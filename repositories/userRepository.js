const pool = require("../config/db");

const findUserByEmail = async (email) => {
  const result = await pool.query(
    `
        SELECT
            id,
            name,
            email,
            age,
            role,
            password_hash
        FROM users
        WHERE email = $1
        `,
    [email],
  );

  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query(
    `
        SELECT
            id,
            name,
            email,
            age,
            role
        FROM users
        WHERE id = $1
        `,
    [id],
  );
  return result.rows[0];
};

const createUser = async (name, email, age, passwordHash) => {
  const result = await pool.query(
    `
        INSERT INTO users
            (name, email, age, password_hash)
        VALUES
            ($1, $2, $3, $4)
        RETURNING id, name, email, age, role
        `,
    [name, email, age, passwordHash],
  );
  return result.rows[0];
};

const getProfileById = async (id) => {
  const result = await pool.query(
    `
        SELECT
            id,
            name,
            email,
            age,
            role
        FROM users
        WHERE id = $1
        `,
    [id],
  );

  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  getProfileById,
};

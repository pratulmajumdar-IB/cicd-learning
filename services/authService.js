//==============================
// POSTGRESQL IMPLEMENTATION
//==============================

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const userRepository = require("../repositories/userRepository");

// const registerUser = async (name, email, age, password) => {
//   const existingUser = await userRepository.findUserByEmail(email);
//   if (existingUser) {
//     throw new Error("Email already registered");
//   }
//   const passwordHash = await bcrypt.hash(password, 10);
//   const user = await userRepository.createUser(name, email, age, passwordHash);
//   return result.rows[0];
// };

// const loginUser = async (email, password) => {
//   const user = await userRepository.findUserByEmail(email);
//   if (!user) {
//     throw new Error("Invalid email or password");
//   }
//   const passwordMatches = await bcrypt.compare(password, user.password_hash);
//   if (!passwordMatches) {
//     throw new Error("Invalid email or password");
//   }
//   const token = jwt.sign(
//     { userId: user.id, name: user.name, email: user.email, role: user.role },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "1h",
//     },
//   );

//   return {
//     user: {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       age: user.age,
//       role: user.role,
//     },
//     token,
//   };
// };

// module.exports = {
//   registerUser,
//   loginUser,
// };


// ===========================
// MONGODB IMPLEMENTATION
// ===========================

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (name, email, age, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    age,
    password: passwordHash,
  });
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    age: user.age,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign(
    {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
    },
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};

const User = require("../models/userModel");

const getAllUsers = async () => {
  return await User.find();
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const updateUser = async (id, name, email, age) => {
  return await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      age,
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

const searchUsers = async (name) => {
  return await User.find({
    name: {
      $regex: name,
      $options: "i",
    },
  });
};

const searchAndFilterUsers = async ({
  name,
  minAge,
  maxAge,
  sort,
  page = 1,
  limit = 10,
}) => {
  const filter = {};
  if (name) {
    filter.name = {
      $regex: name,
      $options: "i",
    };
  }
  if (minAge || maxAge) {
    filter.age = {};
    if (minAge) {
      filter.age.$gte = Number(minAge);
    }
    if (maxAge) {
      filter.age.$lte = Number(maxAge);
    }
  }
  const skip = (Number(page) - 1) * Number(limit);
  let query = User.find(filter);
  if (sort) {
    const sortValue = sort.startsWith("-")
      ? { [sort.substring(1)]: -1 }
      : { [sort]: 1 };
    query = query.sort(sortValue);
  }
  const users = await query.skip(skip).limit(Number(limit));
  const total = await User.countDocuments(filter);
  return {
    users,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUsers,
  searchAndFilterUsers,
};

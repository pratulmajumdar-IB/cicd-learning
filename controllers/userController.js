const userService = require("../services/userService");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  const user = await userService.getUserById(id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.json(user);
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, age } = req.body;
    const user = await userService.updateUser(id, name, email, age);
    res.json(user);
  } catch(error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        error: error.message,
      });
    }
    return res.status(404).json({
      message: "User not found",
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await userService.deleteUser(id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.json({
    message: "User deleted",
    user,
  });
};

const searchUsers = async (req, res) => { // by name only
  try {
    const { name } = req.query;
    const users = await userService.searchUsers(name);
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to search users",
      error: error.message,
    });
  }
};

const searchAndFilterUsers = async (req, res) => {
  try {
    const result = await userService.searchAndFilterUsers(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to search users",
      error: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  searchUsers,
  searchAndFilterUsers,
};

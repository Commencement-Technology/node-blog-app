const User = require("../models/User");

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occured while deleting a user",
      error,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Getting user successfully!",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occured while getting a user",
      error,
    });
  }
};

module.exports = {
  deleteUser,
  getUser,
};

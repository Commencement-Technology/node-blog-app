const User = require("../models/User");
const bcrypt = require("bcryptjs");

const updateUser = async (req, res) => {
  if (req.user.id !== req.params.userId) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to update this user",
    });
  }

  const updateData = {
    ...(req.body.username && { username: req.body.username }),
    ...(req.body.email && { email: req.body.email }),
    ...(req.body.profilePicture && { profilePicture: req.body.profilePicture }),
  };

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    updateData.password = hashedPassword;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: updateData,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occured while updating a userr",
      error,
    });
  }
};

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
  updateUser,
  deleteUser,
  getUser,
};

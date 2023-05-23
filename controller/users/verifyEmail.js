const { RequestError } = require("../../helpers");
const User = require("../../service/schemas/user/users");

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    throw RequestError(404, "User not found");
  }

  if (user.verify) {
    throw RequestError(400, "User had been already verified");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    // verifyToken: null
  });

  return res.status(200).json({ message: "Verification successful" });
};
module.exports = verifyEmail;

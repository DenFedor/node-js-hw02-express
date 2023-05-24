const User = require("./users");
const createUser = async ({ email, password, avatar, verificationToken }) => {
  return User.create({
    email,
    password,
    avatarURL: avatar,
    verificationToken: verificationToken,
  });
};
const checkUser = async ({ email }) => {
  return User.findOne({ email });
};
const updateToken = async ({ tok }) => {
  return User.updateOne({ token: tok });
};
const updateSubscription = async (id, sub) => {
  return User.findByIdAndUpdate(
    { _id: id },
    { subscription: sub },
    { returnDocument: "after" }
  );
};
const updateAvatar = async (id, avatar) => {
  return User.findByIdAndUpdate(
    { _id: id },
    { avatarURL: avatar },
    { returnDocument: "after" }
  );
};
module.exports = {
  createUser,
  checkUser,
  updateToken,
  updateSubscription,
  updateAvatar,
};

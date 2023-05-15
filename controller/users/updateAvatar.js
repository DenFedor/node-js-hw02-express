const service = require("../../service/schemas/user/");
const path = require("path");
const fs = require("fs/promises");
const { RequestError, ResizeImg } = require("../../helpers");

const updateAvatar = async (req, res, next) => {
  const { filename } = req.file;
  if (!filename) {
    throw RequestError(400, "File is required!");
  }
  const formattedFileName=req.user.id + Math.random().toString().slice(2) + filename;
  const tmpPath = path.resolve(__dirname, "../../tmp", filename);
  const publicPath = path.resolve(__dirname, "../../public/avatars", formattedFileName);

  try {
    await ResizeImg(tmpPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    next(error);
  }
await fs.rename(tmpPath, publicPath);
  const userId = req.user.id;
  const user = await service.updateAvatar(userId, `avatars/${formattedFileName}`);
  res.status(200).json({ avatarURL: user.avatarURL});
};
module.exports = updateAvatar;

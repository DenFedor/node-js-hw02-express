const generateAvatar = require("../../helpers/generateAvatar");
const sendMail = require("../../helpers/sendEmail");
const service = require("../../service/schemas/user");
const { authUserSchema } = require("../../validationSchemas/auth");
const bcrypt = require("bcrypt");
const { v4 } = require('uuid')
const registration = async (req, res, next) => {
  try {
    const { error } = authUserSchema.validate(req.body);
    if (error) {
      throw error;
    }
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const avatar = generateAvatar(email);
    const verificationToken = v4();
    const { subscription } = await service.createUser({
      email,
      password: hashedPassword,
      avatar,
      verificationToken: verificationToken,
    });
    await sendMail({
      to: email,
      subject: 'Please, confirm your email',
      html: `<a href="http://localhost:3000/users/verify/${verificationToken}">Confirm your email</a>`,
    })
    res.status(201).json({ user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};
module.exports = registration;

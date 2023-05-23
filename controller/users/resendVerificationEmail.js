const { RequestError } = require("../../helpers");
const sendMail = require("../../helpers/sendEmail");
const service = require("../../service/schemas/user");
const { resendVerificationEmailSchema } = require("../../validationSchemas/auth");
const resendVerificationEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
   throw RequestError(400, "missing required field email")
  }
  const { error } = resendVerificationEmailSchema.validate(req.body);
  if (error) {
    throw error;
  }
  const user = await service.checkUser({ email });
  if (!user) {
    throw RequestError(401);
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed")
  }
  await sendMail({
      to: email,
      subject: 'Please, confirm your email',
      html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm your email</a>`,
    })
    res.status(200).json({ message: "Verification email sent" });
};


module.exports=resendVerificationEmail;
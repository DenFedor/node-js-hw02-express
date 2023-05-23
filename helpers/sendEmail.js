const nodemailer = require('nodemailer')
const { EMAIL_MAILER, EMAIL_MAILER_PASS } = process.env

const sendMail = async ({ to, subject, html }) => {
  const from = 'dfhw6@meta.ua'
  const email = {
    to,
    from,
    subject,
    html,
  }

  const transport = nodemailer.createTransport({
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_MAILER,
      pass: EMAIL_MAILER_PASS,
    },
  })

  await transport.sendMail(email)
}

module.exports = sendMail
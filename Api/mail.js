import nodemailer from 'nodemailer'
import 'dotenv/config'

export const transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL_GMAIL,
  port: process.env.PORT_EMAIL,
  secure: true,
  auth: {

    user: process.env.USER_GMAIL,
    pass: process.env.PASS_GMAIL

  }
})

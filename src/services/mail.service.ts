import exp from 'constants'
import nodemailer, { SendMailOptions } from 'nodemailer'

// Create a transporter using your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: 'shoptea.tealicious@gmail.com',
        pass: 'xlgs ghtt wujl nxcg'
    }
})

// Function to send an email
export async function sendMail(mailOptions: SendMailOptions): Promise<void> {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
                reject(error)
            } else {
                console.log('Email sent: ' + info.response)
                resolve()
            }
        })
    })
}

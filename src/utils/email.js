import nodemailer from 'nodemailer';

const getTransporter = () => {
    const user = process.env.EMAIL_USER
    const pass = process.env.EMAIL_APP_PASSWORD

    if (!user || !pass) {
        console.error('Missing Gmail credentials: EMAIL_USER or EMAIL_APP_PASSWORD is not set.')
        throw new Error('Missing Gmail credentials')
    }

    console.log(`Using Gmail credentials: EMAIL_USER=${user}, EMAIL_APP_PASSWORD=${pass ? '[present]' : '[missing]'}`)

    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user,
            pass
        }
    })
}

// A reusable function to send emails
export const sendEmail = async (to, subject, text, html) => {
    try {
        const transporter = getTransporter()
        const mailOptions = {
            from: `"StockFlow" <${process.env.EMAIL_USER}>`, // Sender display name
            to,
            subject,
            text,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
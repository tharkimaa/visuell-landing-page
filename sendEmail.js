import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

const sendEmail = (to, subject, html) => {
    const data = {
        from: `Visuell <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        html: html,
    };

    return mg.messages.create(process.env.MAILGUN_DOMAIN, data);
};

export default sendEmail;

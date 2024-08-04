import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import sendEmail from './sendEmail.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/api/signup', async (req, res) => {
    const email = req.body.email;
    const confirmLink = `${req.protocol}://${req.get('host')}/api/confirm?email=${encodeURIComponent(email)}`;

    const subject = 'Confirm your email for Visuell';
    const html = `
        <h1>Welcome to Visuell</h1>
        <p>Please confirm your email by clicking the link below:</p>
        <a href="${confirmLink}">Confirm Email</a>
    `;

    try {
        await sendEmail(email, subject, html);
        res.send('Confirmation email sent');
    } catch (error) {
        res.status(500).send('Error sending email');
    }
});

app.get('/api/confirm', async (req, res) => {
    const email = req.query.email;

    const subject = 'New signup for Visuell';
    const html = `<p>A new user has signed up: ${email}</p>`;

    try {
        await sendEmail(process.env.NOTIFY_EMAIL, subject, html);
        res.send('Email confirmed and notification sent');
    } catch (error) {
        res.status(500).send('Error sending notification email');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

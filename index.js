require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import cors

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable all CORS requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint to handle form submission
app.post('/send', (req, res) => {
    const { name, mobile } = req.body;

    // Create a transporter object
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Setup email data
    let mailOptions = {
        from: process.env.EMAIL_USER, 
        to: process.env.EMAIL_USER,   
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nMobile Number: ${mobile}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('error');
        }
        console.log('Message sent: %s', info.messageId);
        res.status(200).send('success');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

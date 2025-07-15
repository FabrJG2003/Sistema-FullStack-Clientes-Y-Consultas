import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD  
    },
    tls: {
        rejectUnauthorized: false,
    }
});

export const enviarEmail = async (to, subject, text) => {
    try{
        const mailOptions = {
            headers: {
                'X-Priority': '1',
                'X-MSMail-Priority': 'High',
            },
            from: `"R&N Asesores Contables" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html:
                `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2d3748;">${subject}</h2>
                    <p style="font-size: 16px;">${text}</p>
                    <p style="color: #718096; font-size: 14px;">
                        <br>Saludos,</br>
                        <strong>Equipo R&N Estudio Contable</strong>
                    </p>
                </div>`
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado a:', to);
        return true;
    } catch (error) {
        console.error('Error al enviar el email:', error.message);
        return false;
    }
}
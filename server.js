// server/server.js
require('dotenv').config(); // Завантажуємо змінні оточення з .env

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; // Сервер буде працювати на порту 5000 за замовчуванням

// Middlewares
app.use(cors());
app.use(express.json());

// Налаштування Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Маршрут для обробки надсилання листа
app.post('/api/send-email', (req, res) => {
  const { name, email, message } = req.body; // Отримуємо дані з форми, включаючи email користувача

  // Перевірка на наявність даних
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Будь ласка, заповніть усі поля.' });
  }

  // Опції електронного листа
  const mailOptions = {
    from: process.env.EMAIL_USER,     // Відправник (ваш email)
    to: process.env.TO_EMAIL,         // Отримувач (ваш teamprojectwebprog@gmail.com)
    replyTo: email,                   // <--- НОВЕ: Вказує email користувача для відповіді
    subject: `Нове повідомлення з веб-форми від ${name}`, // Тема листа
    html: `
      <h3>Нове повідомлення з контактної форми:</h3>
      <p><strong>Ім'я:</strong> ${name}</p>
      <p><strong>Email відправника:</strong> ${email}</p> // <--- НОВЕ: Відображаємо email користувача в тілі листа
      <p><strong>Повідомлення:</strong><br/>${message}</p>
    `
  };

  // Надсилання листа
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Помилка відправки листа:', error);
      res.status(500).json({ success: false, message: 'Не вдалося надіслати повідомлення. Спробуйте пізніше.' });
    } else {
      console.log('Лист надіслано:', info.response);
      res.status(200).json({ success: true, message: 'Повідомлення успішно надіслано!' });
    }
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Бек-енд сервер запущено на http://localhost:${port}`);
});
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
require("dotenv").config();
const cors = require("cors");
const router = require("./routers/index");
const errorHandler = require("./middlewares/errorHandlingMiddleware");
const { createProxyMiddleware } = require('http-proxy-middleware');


const mongoDBKey = `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@quiz-db.4qrs7.mongodb.net/?retryWrites=true&w=majority&appName=Quiz-DB`;
const PORT = process.env.PORT || 3000;
const API_TARGET = process.env.BACKEND_URL || 'http://localhost:3000'

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

// Раздача статических файлов из билда фронтенда
// app.use(express.static(path.join(__dirname, "../quiz-client/dist")));

// совсем забыл, что в dev режиме мы запуускаем как бы два разных сервера. У меня на проде мы запускаем только express js, который раздает статику фронтенда. 







app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect(mongoDBKey);
        app.listen(PORT, () => console.log(`Server is run on ${PORT} port`));
    } catch (err) {
        console.error("Server not run because " + err);
    }
};

start();

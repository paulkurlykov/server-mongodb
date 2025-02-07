const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
require("dotenv").config();
const cors = require("cors");
const router = require("./routers/index");
const errorHandler = require("./middlewares/errorHandlingMiddleware");

const mongoDBKey = `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@quiz-db.4qrs7.mongodb.net/?retryWrites=true&w=majority&appName=Quiz-DB`;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.use((req, res, next) => {
    console.log(`Метод: ${req.method}`);
    console.log(`Заголовки: ${JSON.stringify(req.headers)}`);

    if (req.method === "POST") {
        console.log("POST-запрос был перенаправлен.");
    }
    next();
});

// 📌 Раздача статических файлов из билда фронтенда
app.use(express.static(path.join(__dirname, "../quiz-client/dist")));

// 📌 Если нет API-роута, отдаём `index.html`
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../quiz-client/dist", "index.html"));
});


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

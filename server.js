const express = require("express");
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
require('dotenv').config();



const mongoDBKey = `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@quiz-db.4qrs7.mongodb.net/?retryWrites=true&w=majority&appName=Quiz-DB`
const PORT = process.env.PORT || 3000;

const app = express();
const hbs = handlebars.create({
    defaultLayout: "main",
    extname: "hbs"
})

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");


const start = async () => {
    try {
        await mongoose.connect(mongoDBKey);
        app.listen(PORT, () => console.log(`Server is run on ${PORT} port`));
    } catch (err) {
        console.error("Server not run because " + err);
    }
};

start();
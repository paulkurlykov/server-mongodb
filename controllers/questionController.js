const Questions = require("../models/questions");
const ApiErrors = require("../error/ApiErrors");

const create = async (req, res, next) => {
    try {
        const { question, topic, answerType, options, rightAnswer, textAnswer, codeSnippet } = req.body;

        const questionItem = new Questions({
            question,
            topic,
            answerType,
            options,
            textAnswer,
            rightAnswer,
            codeSnippet
        });

        const response = await questionItem.save();

        return res.status(201).json(response);
    } catch (err) {
        next(ApiErrors.badRequest("Could not upload question"));
    }
};

const getAll = async (req, res, next) => {
    try {
        console.log("inside get-request-function!");
        const questions = await Questions.find({});
        // const questions = [];

        if (questions.length === 0) {
            return res.json({ message: "there is no data" });
        }

        return res.json(questions);
    } catch (err) {
        next(ApiErrors.badRequest("Could not get all questions"));
    }
};

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;

        const question = await Questions.findById(id).exec();

        return res.json(question);
    } catch (err) {
        next(ApiErrors.badRequest("Could not get question by ID"));
    }
};

module.exports = { create, getAll, getOne };

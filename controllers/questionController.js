const Questions = require('../models/questions');

const create = async (req, res) => {

try {
    const {question, label, answerType, options, textAnswer, codeSnippet} = req.body;

    const questionItem = new Questions({
        question,
        label,
        answerType,
        options,
        textAnswer,
        codeSnippet
    });

    const responce = await questionItem.save();

    return res.json(responce);
} catch (err) {
    console.error("Exception " + err);
}


};

const getAll = async (req, res) => {
    try {
        const questions = await Questions.find({});

        if(questions.length === 0) {
            return res.json({message: 'there is no data'});
        }
    
        return res.json(questions);
    } catch (err) {
        console.error("Exception " + err);
    }
};

const getOne = async (req, res) => {
    let it = "be";
};

module.exports = { create, getAll, getOne };

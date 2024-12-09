const {Schema, model} = require('mongoose');

const schema = new Schema({
    question: String,
    label: String,
    answerType: String,
    options: [String],
    textAnswer: String,
    rightAnswer: Number,
    codeSnippet: String
});

module.exports = model('Questions', schema);
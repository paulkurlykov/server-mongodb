const {Schema, model} = require('mongoose');

const schema = new Schema({
    question: String,
    topic: String,
    answerType: String,
    options: [String],
    textAnswer: String,
    rightAnswer: String,
    codeSnippet: String
});

module.exports = model('Questions', schema);
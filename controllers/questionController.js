const Questions = require('../models/questions');

const create = async (req, res) => {

try {
    const questions = await Questions.find({});

    return res.json(questions);
} catch (err) {
    console.error("Exception " + err);
}


};

const getAll = async (req, res) => {
    const questions = "";
};

const getOne = async (req, res) => {
    let it = "be";
};

module.exports = { create, getAll, getOne };

const Questions = require("../models/questions");
const ApiErrors = require("../error/ApiErrors");
const { ObjectId } = require("mongodb");

const create = async (req, res, next) => {
    try {
        const { question, topic, answerType, options, rightAnswer, textAnswer, codeSnippet } =
            req.body;

        const questionItem = new Questions({
            question,
            topic,
            answerType,
            options,
            textAnswer,
            rightAnswer,
            codeSnippet,
        });

        const response = await questionItem.save();

        return res.status(201).json(response);
    } catch (err) {
        next(ApiErrors.badRequest("Could not upload question"));
    }
};

const getAll = async (req, res, next) => {
    try {

        const topicFilterArray = req.query.topicFilter?.split(",") || [];
        const queryFilter = req.query.queryFilter && req.query.queryFilter.length >= 3 ? req.query.queryFilter : null;
        const filter = {};
        

        // get all raw data without any filter and pagination
        if(topicFilterArray.length === 0) {
            console.log('no filter and pagination');
            const questions = await Questions.find({});

            return res.json(questions);
        }

        // add filter if topicFilter param exists
        if(topicFilterArray.length > 0) {
            filter.topic = {$in: topicFilterArray};
        }

        // add filter if queryFilter exists
        if(queryFilter) {
            filter.$or = [
                {question: { $regex: queryFilter, $options: 'i'}}
            ]
        }

        const currentPage = Number(req.query.page);
        const itemsPerPage = Number(req.query.limit) || Number.MAX_SAFE_INTEGER;

        // get topic-filtered data without pagination
        if(!currentPage || !itemsPerPage) {
            console.log('filter but no pagination');
            const questions = await Questions.find({ topic: { $in: topicFilterArray }});

            return res.json(questions);
        }

        const skip = (currentPage - 1) * itemsPerPage;
        const totalCount = await Questions.countDocuments({});
        // const filteredCount = await Questions.find({ topic: { $in: topicFilterArray } }).countDocuments({});

        // final fetch data with filter, pagination
        const questions = await Questions.find(filter).skip(skip).limit(itemsPerPage);
        const filteredCount = await Questions.find(filter).countDocuments({});

        return res.json({
            data: questions,
            currentPage,
            itemsPerPage,
            totalCount,
            filteredCount,
            totalPages: Math.ceil(totalCount / itemsPerPage),
            filteredPages: Math.ceil(filteredCount / itemsPerPage)

        });

    } catch (err) {
        next(ApiErrors.badRequest("Could not get all questions"));
        console.error(err.message);
    }
};

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;

        console.log(id);

        if (!ObjectId.isValid(id)) {
            console.log('Invalid ID format');
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const question = await Questions.findById(id).exec();

        // console.log(question);

        if (!question._id) {
            console.log('Could not find item with this id');
            return res.status(404).json({ message: "Question not found" });
        }

        return res.json(question);
    } catch (err) {
        next(ApiErrors.badRequest("Could not get question by ID"));
    }
};

const removeOne = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            console.log('Invalid ID format');
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const result = await Questions.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            console.log('Could not find item has this question');
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: "Item deleted successfully" });
    } catch (err) {
        console.error("Exception " + err);
        console.log(`ERROR: ${err.message}`);
        next(ApiErrors.badRequest("Could not delete question by ID"));
    }
};

const updateOne = async (req, res, next) => {

    try {
        const { id } = req.params;

    const updateData = req.body;

    // validation of id's format
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    
    // validation of existing the id in the current db
    const result = await Questions.findOne({ _id: id });

    if (!result) {
        return res.status(404).json({ error: "Question not found" });
    }


    const updatedQuestion = await Questions.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if(!updatedQuestion) {
        return res.status(404).json({ error: "Question not found" });
    }

    res.json(updatedQuestion);
    } catch (err) {
        next(ApiErrors.badRequest("Could not delete question by ID"));
        console.error("Exception " + err);
    }

}


module.exports = { create, getAll, getOne, removeOne, updateOne };

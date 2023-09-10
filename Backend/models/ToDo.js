const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toDoSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    taskToDo: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    completeBefore: {
        type: String,
    },
    isCompleted: {
        type: Boolean,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
    },
})
const ToDo = mongoose.model('toDo', toDoSchema);
module.exports = ToDo;
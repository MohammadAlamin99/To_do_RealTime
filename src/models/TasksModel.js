const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DataSchema = mongoose.Schema({
    users:{
        type: [{ type: Schema.Types.ObjectId, ref: "users" }],
    },

    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
    status: { type: String, enum: ["To-Do", "In Progress", "Completed"], default: "To-Do" },
    email:{type:String},
    category: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},{versionKey: false})

const TasksModel = mongoose.model('tasks', DataSchema);
module.exports = TasksModel;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, required: true },
  scheduled_date: { type: Date, required: true },
  completed_date: { type: Date, required: false },
  project_id: {
    type: Schema.Types.ObjectId,
    ref: "Project"
  },

});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
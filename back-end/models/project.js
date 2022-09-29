const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  order_date: { type: Date, required: true },
  promise_date: { type: Date, required: true },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client"
  },
  invoice: {
    type: Schema.Types.ObjectId,
    ref: "Invoice"
  },
  // tasks: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "Task"
  // }],

},
  { timestamps: true });

projectSchema.virtual('tasks', {
  ref: 'Task', // The model to use
  localField: '_id', // Find [records] where `localField`
  foreignField: 'task', // is equal to `foreignField`
});
projectSchema.virtual('task_count', {
  ref: 'Task', // The model to use
  localField: '_id', // Find [records] where `localField`
  foreignField: 'task', // is equal to `foreignField`
  count: true,
});

projectSchema.virtual('client_name', {
  ref: 'Client',
  localField: 'client',
  foreignField: 'name',
  justOne: true
});

projectSchema.set('toObject', { virtuals: true });
projectSchema.set('toJSON', { virtuals: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true, islink: true },
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

  // so the idea is to be able to populate an array of fields to be treated
  // as links when used in a display table. it doesn't persist, but if you set it
  // from the server route, before calling the find(), you should be able to 
  // .populate() to include it in the json result to send to the view. that's the plan.
projectSchema.virtual('link_fields', {
  type: Array
})
  .get(function () { return this._link_fields })
  .set(function (v) { this._link_fields = v });


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
  islink: true,
  justOne: true
});

projectSchema.set('toObject', { virtuals: true });
projectSchema.set('toJSON', { virtuals: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
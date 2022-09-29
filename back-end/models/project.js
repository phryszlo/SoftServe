const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  order_date: { type: Date, required: true },
  promise_date: { type: Date, required: true },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client"
  },

},
  { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
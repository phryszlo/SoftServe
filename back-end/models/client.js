const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
},
  { timestamps: true });

// SELECT [whatever] FROM ref WHERE localField = foreignField;
clientSchema.virtual('projects', {
  ref: 'Project', // The model to use
  localField: '_id', // Find [records] where `localField`
  foreignField: 'client', // is equal to `foreignField`
});
clientSchema.virtual('project_count', {
  ref: 'Project', // The model to use
  localField: '_id', // Find [records] where `localField`
  foreignField: 'client', // is equal to `foreignField`
  count: true,
});

clientSchema.set('toObject', { virtuals: true });
clientSchema.set('toJSON', { virtuals: true });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
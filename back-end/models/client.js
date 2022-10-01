const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true },
  phone: { type: String, required: false },
  image_url: { type: String, required: false, default: "https://www.thispersondoesnotexist.com/image" },
},
  { timestamps: true });

// SELECT [whatever] FROM ref WHERE localField = foreignField; (ish)
clientSchema.virtual('projects', {
  ref: 'Project', // The model to use
  localField: '_id', // Find [records] where `localField`
  foreignField: 'client', // is equal to `foreignField`
  default: [],
});

clientSchema.virtual('project_count', {
  ref: 'Project', 
  localField: '_id', 
  foreignField: 'client', 
  count: true,
  default: 0,
});

clientSchema.set('toObject', { virtuals: true });
clientSchema.set('toJSON', { virtuals: true });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  budget_number: { type: String, required: true },
  project_id: {
    type: Schema.Types.ObjectId,
    ref: "Project"
  },
  // invoice_items: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "InvoiceItems"
  // }],

},
  { timestamps: true });

invoiceSchema.virtual('invoice_items', {
  ref: 'InvoiceItem', // The model to use
  localField: '_id', // Find [records] where `localField`
  foreignField: 'invoice_id', // is equal to `foreignField`
});


invoiceSchema.set('toObject', { virtuals: true });
invoiceSchema.set('toJSON', { virtuals: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  name: { type: String, required: true },
  total: { type: Number, required: false },
  project_id: {
    type: Schema.Types.ObjectId,
    ref: "Project"
  },
  invoice_items: {
    type: Schema.Types.ObjectId,
    ref: "InvoiceItems"
  },

});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
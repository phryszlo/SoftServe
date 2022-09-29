const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  budget_number: { type: String, required: true },
  project_id: {
    type: Schema.Types.ObjectId,
    ref: "Project"
  },
  invoice_items: [{
    type: Schema.Types.ObjectId,
    ref: "InvoiceItems"
  }],

},
  { timestamps: true });


const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
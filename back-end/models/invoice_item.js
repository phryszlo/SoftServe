const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceItemSchema = new Schema({
  description: { type: String, required: true },
  cost: { type: Number, required: true },
  invoice_id: {
    type: Schema.Types.ObjectId,
    ref: "Invoice"
  },

},
  { timestamps: true });


const InvoiceItem = mongoose.model('InvoiceItem', invoiceItemSchema);

module.exports = InvoiceItem;
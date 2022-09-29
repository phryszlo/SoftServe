
// back-end/routes/invoice_items.js

const express = require('express');
const router = express.Router();
const { faker } = require('@faker-js/faker');
const { generateSlug } = require("random-word-slugs");

const Invoices = require('../models/invoice');
const InvoiceItems = require('../models/invoice_item');
const { Mongoose } = require('mongoose');

/*
const invoiceItemSchema = new Schema({
  description: { type: String, required: true },
  cost: { type: Number, required: true },
  invoice_id: {
*/

router.get('/seed/:q', (req, res) => {
  console.log(`seeding ${req.params.q} invoice_items (maybe)`);
  const fakes = [];
  const invoiceIds = [];

  // get all invoice_ids in our database
  Invoices.find({}, "_id")
    .then((foundInvoices) => {
      foundInvoices.forEach((invoice) => {
        invoiceIds.push(invoice.id);
      })
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err.message });
    })

  //ObjectId('63334d4399b7d70f32220112')

  // generate fake data from faker and random-word-slugs libs
  for (let i = 0; i < req.params.q; i++) {
    let rndIdx = Math.floor(Math.random() * invoiceIds.length);
    let p = {};
    let name = generateSlug(4, { format: "title" });
    let orderDate = faker.date.between("2022-01-01", Date.now())
    let promiseDate = faker.date.future();
    p.name = name;
    p.order_date = orderDate;
    p.promise_date = promiseDate;
    p.invoice = invoiceIds[rndIdx];
    fakes.push(p);
  }



  InvoiceItems.create(fakes,
    (err, data) => {
      console.log(data);
      res.status(400).json({ success: false, message: err });
    })
})


//`${new Date(orderDate).toDateString()} ${new Date(orderDate).toLocaleTimeString('en-US')}`;
//`${new Date(promiseDate).toDateString()} ${new Date(promiseDate).toLocaleTimeString('en-US')}`;


router.get('/', async (req, res) => {
  // just testing a cursor
  console.log('invoice_items root route')

  InvoiceItems.find({}, "-_id -__v -createdAt -updatedAt")
  // InvoiceItems.find()
    .then((allInvoiceItems) => {
      console.log(`allInvoiceItems: ${allInvoiceItems}`);

      // note: do not try: res.json({ invoice_items: allInvoiceItems })
      res.json(allInvoiceItems);
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err.message });
    });
})


router.post('/', async (req, res) => {
  await InvoiceItems.create(req.body)
    .then((newInvoiceItem) => {
      res.json({ 'newInvoiceItem': newInvoiceItem });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, message: err.message });
    })
})

router.delete('/:id', async (req, res) => {
  await InvoiceItems.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(201).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, message: err.message });
    })
})

// =========PLAYER: GET ONE BY ID ============
router.get('/:id', async (req, res) => {

  await InvoiceItems.findById(req.params.id)
    .then((invoice_item) => {
      res.json({ 'invoice_item': invoice_item });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, message: err.message });
    })
});


router.put('/:id', async (req, res) => {
  await InvoiceItems.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedInvoiceItem) => {
      res.json({ 'invoice_item': updatedInvoiceItem });
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err.message });
    })
})


module.exports = router;
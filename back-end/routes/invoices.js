
// back-end/routes/invoices.js

const express = require('express');
const router = express.Router();
const { faker } = require('@faker-js/faker');
const { generateSlug } = require("random-word-slugs");

const Projects = require('../models/project');
const Invoices = require('../models/invoice');
const { Mongoose } = require('mongoose');
const InvoiceItem = require('../models/invoice_item');

/*
const invoiceSchema = new Schema({
  budget_number: { type: String, required: true },

  // parent ref
  project_id: {
    type: Schema.Types.ObjectId,
    ref: "Project"
  },

  // child refs
  invoice_items: 
*/

router.get('/seed/:q', (req, res) => {
  console.log(`seeding ${req.params.q} invoices (maybe)`);
  const fakes = [];
  const projectIds = [];

  // get all project_ids in our database
  Projects.find({}, "_id")
    .then((foundProjects) => {
      foundProjects.forEach((project) => {
        projectIds.push(project.id);
      })
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err.message });
    })

  //ObjectId('63334d4399b7d70f32220112')

  // generate fake data from faker and random-word-slugs libs
  for (let i = 0; i < req.params.q; i++) {
    let rndIdx = Math.floor(Math.random() * projectIds.length);
    let p = {};
    let budget_number = faker.finance.creditCardNumber('44[0-2][0-1]-####-####-####'); // generateSlug(1, { format: "title" });
    let orderDate = faker.date.between("2022-01-01", Date.now())
    let promiseDate = faker.date.future();
    p.budget_number = budget_number;
    p.order_date = orderDate;
    p.promise_date = promiseDate;
    p.project = projectIds[rndIdx];
    fakes.push(p);
  }



  Invoices.create(fakes)
    .then((data) => {
      // console.log(`return from invoice create: ${JSON.stringify(data)}`);
      const newIds = [];
      data.forEach((obj) => {
        newIds.push(obj._id);
        console.log(obj._id);
        let invoice_items = seedInvoiceItems(obj._id, 5);
        // console.log(`invoice_items returned: ${JSON.stringify(invoice_items)}`);
        invoice_items.forEach(async (item) => {
          await InvoiceItem.create(item);
          // .then((result) => {
          //   console.log(`result: ${JSON.stringify(result)}`);
          // })
          // .error((err) => {
          //   console.log(`oh dear, ${err} happened.`)
          // })
        })
      })
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err });
    })
})

const seedInvoiceItems = (invoice_id, count) => {
  const fakes = [];
  for (let i = 0; i < count; i++) {
    let item = {};
    item.description = faker.commerce.productName(); // generateSlug(7, { format: "title" });;
    item.vendor = faker.company.name();
    item.cost = faker.finance.amount(0.59, 35000);
    item.invoice_id = invoice_id;
    fakes.push(item);
  };
  return fakes;
}

//`${new Date(orderDate).toDateString()} ${new Date(orderDate).toLocaleTimeString('en-US')}`;
//`${new Date(promiseDate).toDateString()} ${new Date(promiseDate).toLocaleTimeString('en-US')}`;


router.get('/', async (req, res) => {
  try {
    console.log('invoice root route')
    // if you leave out the _id, the populate on a virtual lookup won't work.

    const allInvoices = await Invoices.find({}, "-__v -createdAt -updatedAt")
      .populate('project_id')
      .populate({ path: 'invoice_items', select: 'vendor invoice_id cost'  })
//  populate({ path: 'posts', select: 'title author' }).
      // .populate({ path: 'invoice_items', select: 'invoice_id vendor description' });

    console.log(`${allInvoices.length} Invoices returned`);
    res.json({ links: ['budget_number'], allInvoices });
  }
  catch (err) {
    // res.status(400).json(obj)
    console.log(`i
    nvoice root erred: ${err}`)
    res.status(400).json({ success: false, message: err });
  }

});


router.post('/', async (req, res) => {
  await Invoices.create(req.body)
    .then((newInvoice) => {
      res.json({ 'newInvoice': newInvoice });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, message: err.message });
    })
})

router.delete('/:id', async (req, res) => {
  await Invoices.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(201).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, message: err.message });
    })
})

router.get('/:id', async (req, res) => {

  await Invoices.findById(req.params.id)
    .then((invoice) => {
      res.json({ 'invoice': invoice });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, message: err.message });
    })
});


router.patch('/:id', async (req, res) => {

  console.log(`invoices PUT: ${req.params.id} body: ${JSON.stringify(req.body)}`);
  await Clients.findByIdAndUpdate(
    req.params.id, req.body,
    { new: true }
  )
    .then((updatedInvoice) => {
      console.log(`updatedInvoice = ${updatedInvoice}`)
      res.json({ 'invoice': updatedClient });
    })
    .catch((err) => {
      res.json(err);
    })
})

router.put('/:id', async (req, res) => {
  await Invoices.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedInvoice) => {
      res.json({ 'invoice': updatedInvoice });
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err.message });
    })
})


module.exports = router;
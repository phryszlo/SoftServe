
// back-end/routes/invoices.js

const express = require('express');
const router = express.Router();
const { faker } = require('@faker-js/faker');
const { generateSlug } = require("random-word-slugs");

const Projects = require('../models/project');
const Invoices = require('../models/invoice');
const { Mongoose } = require('mongoose');

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
    let budget_number = generateSlug(4, { format: "title" });
    let orderDate = faker.date.between("2022-01-01", Date.now())
    let promiseDate = faker.date.future();
    p.budget_number = budget_number;
    p.order_date = orderDate;
    p.promise_date = promiseDate;
    p.project = projectIds[rndIdx];
    fakes.push(p);
  }



  Invoices.create(fakes,
    (err, data) => {
      console.log(data);
      res.status(400).json({ success: false, message: err });
    })
})


//`${new Date(orderDate).toDateString()} ${new Date(orderDate).toLocaleTimeString('en-US')}`;
//`${new Date(promiseDate).toDateString()} ${new Date(promiseDate).toLocaleTimeString('en-US')}`;


router.get('/', async (req, res) => {
  // just testing a cursor
  console.log('invoices root route')
  // const cursor = Invoices.find().cursor();
  // for (let doc = await cursor.next();
  //   doc != null;
  //   doc = await cursor.next()) {
  //   Object.values(doc).forEach(obj => {
  //     Object.entries(obj).forEach((key, val) => {
  //       // console.log(`key: ${key} val: ${val}`);
  //       // console.log(`key type: ${typeof(key)}`);
  //     })
  //     // console.log(`... ${obj}`)
  //   })
  //   // console.log(`doc := ${doc}`);
  // }


  Invoices.find({}, "-_id -__v -createdAt -updatedAt")
  // Invoices.find()
    .then((allInvoices) => {
      console.log(`allInvoices: ${allInvoices}`);

      // note: do not try: res.json({ invoices: allInvoices })
      res.json(allInvoices);
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err.message });
    });
})


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

// =========PLAYER: GET ONE BY ID ============
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
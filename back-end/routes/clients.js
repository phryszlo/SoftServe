
// back-end/routes/clients.js

const express = require('express');
const router = express.Router();
const { faker } = require('@faker-js/faker');

const Clients = require('../models/client');
// const Projects = require('../models/project');

router.get('/seed/:q', (req, res) => {
  console.log(`seeding ${req.params.q} clients (maybe)`);
  const fakes = [];

  for (let i = 0; i < req.params.q; i++) {
    let c = {};
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email(firstName, lastName);
    let phone = faker.phone.number();
    let image_url = 'http://thispersondoesnotexist.com/image';
    c.name = `${firstName} ${lastName}`;
    c.email = email;
    c.phone = phone;
    c.image_url = image_url;
    fakes.push(c);
  }
  Clients.create(fakes,
    (err, data) => {
      console.log(data);
      res.json(err);
    })
})


router.get('/', async (req, res) => {
  try {
    console.log('clients root route')
    // if you leave out the _id, the populate on a virtual lookup won't work.

    const allClients = await Clients.find({}, "-__v -createdAt -updatedAt")
      // the {path:, select:} props refer to a virtual in the schema
      .populate({ path: 'project_count', select: 'client' });

    console.log(`${allClients.length} clients returned`);
    res.json({ links: ['name'], allClients });
  }
  catch (err) {
    // res.status(400).json(obj)
    res.status(400).json({ success: false, message: err });
  }

});



router.get('/:id', (req, res) => {
  console.log(`route api/client/:id => id=${req.params.id}`);
  Clients.findById(req.params.id)
    .then((foundClient) => {
      console.log(foundClient)
      res.json(foundClient);
    })
    .catch((err) => {
      res.json(err);
    });
})


router.put('/:id', async (req, res) => {
  // Object.entries(req.body).forEach(([key, val], index) => {
  //   console.log(`entry: ${key}: ${val}`);
  // })
  console.log(`clients PUT: ${req.params.id} body: ${JSON.stringify(req.body)}`);
  await Clients.findByIdAndUpdate(
    req.params.id, req.body,
    { new: true }
  )
    .then((updatedClient) => {
      console.log(`updatedClient = ${updatedClient}`)
      res.json({ 'client': updatedClient });
    })
    .catch((err) => {
      res.json(err);
    })
})


router.post('/', async (req, res) => {
  await Clients.create(req.body)
    .then((newClient) => {
      res.json({ 'newClient': newClient });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    })
})

router.delete('/random/:q', async (req, res) => {
  console.log(`delete random: ${req.params.q}`);
  try {
    const clientIds = await Clients.find({}, { select: '_id' });
    // console.log(`projids: ${clientIds}`);
    for (let i = 0; i < req.params.q; i++) {
      let rnd = Math.floor(Math.random() * clientIds.length);
      console.log(`deleting ${clientIds[rnd]}`);
      await Clients.findByIdAndRemove(clientIds[rnd])
    }
  }
  catch (err) {
    console.log(`delete random failed: ${err}`);

  }
  7
})

router.delete('/:id', (req, res) => {
  console.log(`client delete ${req.params.id} route reached`);
  try {
    Clients.findByIdAndRemove(req.params.id)
      .then((removed) => {
        console.log(removed && JSON.stringify(removed));
        // err && res.status(400).json({ success: false, message: `delete attempt failed. received ${req.params.id}` });
        res.status(201).json({ success: true }); //, message: `delete succeeded for ${req.params.id}`
      })
  }
  catch (err) {
    err && res.status(400).json({ success: false, message: `delete attempt failed. ` });
  }
})






module.exports = router;
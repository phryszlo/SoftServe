
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
    c.name = `${firstName} ${lastName}`;
    c.email = email;
    c.phone = phone;
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

router.delete('/:id', async (req, res) => {
  await Clients.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ 'success': true });
    })
    .catch((err) => {
      console.log(err);
      res.json({ 'success': false });
    })
})

// =========PLAYER: GET ONE BY ID ============
router.get('/:id', async (req, res) => {

  await Clients.findById(req.params.id)
    .then((client) => {
      res.json({ 'client': client });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    })
});


router.put('/:id', async (req, res) => {
  await Clients.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedClient) => {
      res.json({ 'client': updatedClient });
    })
    .catch((err) => {
      res.json(err);
    })
})


module.exports = router;
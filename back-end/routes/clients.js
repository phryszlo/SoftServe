
// back-end/routes/clients.js

const express = require('express');
const router = express.Router();
const { faker } = require ('@faker-js/faker');

const Clients = require('../models/client');

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
  console.log('clients route hit')
  await Clients.find()
    .then((allClients) => {
      console.log(allClients)
      res.json({ 'clients': allClients });
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
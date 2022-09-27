

const express = require('express');
const router = express.Router();

const Clients = require('../models/client');



// router.get('', (req, res) => {
//   console.log('get route hit');
//   res.json({ 'success': true });
// })

router.get('/seed', (req, res) => {
  Clients.create([
    {
      name: "Jim James",
      email: "jj@gmail.org",
      phone: "111-222-3333",
    },
    {
      name: "Anna Annasdottir",
      email: "aa@gmail.org",
      phone: "111-333-3333",
    },
    {
      name: "Greg Gregsson",
      email: "gg@gmail.org",
      phone: "111-444-3333",
    },
    {
      name: "Alfons deAlfons",
      email: "ad@gmail.org",
      phone: "111-555-3333",
    },
    {
      name: "Jana Janovitch",
      email: "jj2@gmail.org",
      phone: "111-666-3333",
    }
  ],
    (err, data) => {
      res.json(err);
      // res.redirect("/clients");
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

router.get('/new', (req, res) => {
  res.render('clients/Client');
})

router.post('/', async (req, res) => {
  await Clients.create(req.body)
    .then((newClient) => {
      res.redirect('/clients')
    })
})

router.delete('/:id', async (req, res) => {
  await Clients.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/clients');
    })
    .catch((err) => {
      res.json();
    })
})

// =========PLAYER: GET ONE BY ID ============
router.get('/:id', async (req, res) => {

  await Clients.findById(req.params.id)
    .populate("vehicles")
    .populate("weapons")
    .then((result) => {
      res.render('clients/Client', {
        client: result,
      })
    })
    .catch((err) => {
      res.json(err);
    })
});


router.put('/:id', async (req, res) => {
  await Clients.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedClient) => {
      res.redirect('clients');
    })
    .catch((err) => {
      res.json(err);
    })
})


module.exports = router;
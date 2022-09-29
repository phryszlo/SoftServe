
// back-end/routes/projects.js

const express = require('express');
const router = express.Router();
const { faker } = require('@faker-js/faker');
const { generateSlug } = require("random-word-slugs");

const Clients = require('../models/client');
const Projects = require('../models/project');
const { Mongoose } = require('mongoose');


/*
app.post('/addPublisher', async (req, res) => {
   try {
      //validate req.body data before saving
      const publisher = new Publisher(req.body);
      await publisher.save();
      res.status(201).json({success:true, data: publisher });

   } catch (err) {
      res.status(400).json({success: false, message:err.message});
   }
});
*/

router.get('/seed/:q', (req, res) => {
  console.log(`seeding ${req.params.q} projects (maybe)`);
  const fakes = [];
  let clientIds = [];

  // get all client_ids in our database
  // to randomly assign to 
  Clients.find({}, "_id")
    .then((foundClients) => {
      foundClients.forEach((client) => {
        clientIds.push(client.id);
      })

      //ObjectId('63334d4399b7d70f32220112')

      // generate fake data from faker and random-word-slugs libs
      for (let i = 0; i < req.params.q; i++) {
        let rndIdx = Math.floor(Math.random() * clientIds.length);
        console.log(`rndIdx = ${rndIdx}`)
        let p = {};
        let title = generateSlug(4, { format: "title" });
        let orderDate = faker.date.between("2022-01-01", Date.now())
        let promiseDate = faker.date.future();
        p.title = title;
        p.order_date = orderDate;
        p.promise_date = promiseDate;
        p.client = clientIds[rndIdx];
        console.log(`p.client = ${p.client}`)
        fakes.push(p);
      }

      Projects.create(fakes,
        (err, data) => {
          console.log(data);
          res.status(400).json({ success: false, message: err });
        })

    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err });
    })
})


//`${new Date(orderDate).toDateString()} ${new Date(orderDate).toLocaleTimeString('en-US')}`;
//`${new Date(promiseDate).toDateString()} ${new Date(promiseDate).toLocaleTimeString('en-US')}`;


router.get('/', async (req, res) => {
  // just testing a cursor
  console.log('projects root route')

  Projects.find({}, "-__v -createdAt -updatedAt")
    .populate({ path: 'client', select: 'name' })
    .then((allProjects) => {

      console.log(`allProjects: ${allProjects}`);

      res.send(allProjects);
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err.message });
    });
})


router.post('/', async (req, res) => {
  await Projects.create(req.body)
    .then((newProject) => {
      res.json({ 'newProject': newProject });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, message: err.message });
    })
})

router.delete('/:id', async (req, res) => {
  await Projects.findByIdAndRemove(req.params.id)
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

  await Projects.findById(req.params.id)
    .then((project) => {
      res.json({ 'project': project });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, message: err.message });
    })
});


router.put('/:id', async (req, res) => {
  await Projects.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedProject) => {
      res.json({ 'project': updatedProject });
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err.message });
    })
})


module.exports = router;

// back-end/routes/projects.js

const express = require('express');
const router = express.Router();
const { faker } = require('@faker-js/faker');
const { generateSlug } = require("random-word-slugs");

const Clients = require('../models/client');
const Projects = require('../models/project');


// #region seed routes

// here's a route to assign existing client_ids at random into all current projects.
// one use: re-wire things after rashly deleting your client table from Atlas.
router.get('/sow_clientele', async (req, res) => {
  console.log(`sowing clientele into current projects (maybe)`);
  let clientIds = [];

  try {
    // get all client_ids in our database
    const allClients = await Clients.find({}, "_id");
    allClients.forEach((client) => {
      clientIds.push(client.id);
    });

    // and assign them to existing projects
    const allProjects = await Projects.find();
    let counter = 0;
    allProjects.forEach(async (project) => {
      let rndIdx = Math.floor(Math.random() * clientIds.length);
      await project.updateOne({ client: clientIds[rndIdx] })
        .then(counter++);
    })

    res.send(`${counter} products modded`);
    // res.redirect('/products');
  }
  catch (err) {
    res.status(400).json({ success: false, message: err });
  }
})


// this seed route creates quantity=q projects with fake data.
// it does NOT add client_ids. if you need client_ids, use /seed/:q/withclients instead,
// or follow this call with /sow_clientele 
router.get('/seed/:q', async (req, res) => {
  console.log(`seeding new projects (maybe), no client_ids being added.`);
  let clientIds = [];

  try {
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
      fakes.push(p);
    }

    // and assign them to existing projects
    await Projects.insertMany(fakes)
      .then((err, data) => {
        console.log(`projects created : ${data}`);
        err && res.status(400).json({ success: false, message: 'projs create errd' });
        res.status(201).json({ success: true, message: `${data.length} projects created` });
      })
      .catch((error) => {
        res.status(400).json({ success: false, message: 'projs create errd .catch caught' });
      })

    // res.redirect('/products');
  }
  catch (err) {
    res.status(400).json({ success: false, message: 'general failure oh no' });
  }
})


// this route seeds new projects quantity=q. 
// client_ids are randomly assigned in here also
router.get('/seed/:q/withclients', (req, res) => {
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
        let title = faker.internet.domainName; // generateSlug(4, { format: "title" });
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
          err && res.status(400).json({ success: false, message: 'projs create errd' });
          res.status(201).json({ success: true, message: `${data.length} projects created` });
        })

    })
    .catch((err) => {
      res.status(400).json({ success: false, message: 'gen catch caught err' });
    })
})

// #endregion


router.get('/delete/:q', async (req, res) => {

})

//`${new Date(orderDate).toDateString()} ${new Date(orderDate).toLocaleTimeString('en-US')}`;
//`${new Date(promiseDate).toDateString()} ${new Date(promiseDate).toLocaleTimeString('en-US')}`;
//`${new Date(createdAt).toDateString()} ${new Date(createdAt).toLocaleTimeString('en-US')}`;

router.get('/', async (req, res) => {
  try {
    console.log('projects root route')
    const allProjects = await Projects.find({}, " -__v -createdAt -updatedAt")
      .populate({ path: 'client', options: { select: { 'name': 1 } } })
    // {
    //   $lookup: { from: 'clients', localField: 'client', foreignField: '_id', as: 'clientele' }
    // }
    // the {path:, select:} props refer to a virtual in the schema

    // .aggregate()//.lookup({ from: 'clients', localField: 'client', foreignField: '_id', as: 'clientele' });

    console.log(`${allProjects.length} projects returned`);
    res.json({ links: ['title', 'client'], allProjects });
  }
  catch (err) {
    res.status(400).json({ success: false, message: 'general failure' });
  }
})

// GET ONE
router.get('/:id', (req, res) => {
  console.log(`projects/${req.params.id} reached`);
    Projects.findById(req.params.id)
      .populate('client') //{ path: 'client', options: { select: { 'name': 1 } } })
      .then((foundProject) => {
        console.log(`foundProject: ${foundProject}`)
        let foundClient = foundProject.client ? foundProject.client : {};
        res.json({ "project": foundProject, "client": foundClient });
      })
      .catch((err) => {
        res.json({ error: err });
      });
});


router.patch('/:id', async (req, res) => {
  console.log(`put route, projects`);
  Object.entries(req.body).forEach(([key, val], index) => {
    console.log(`entry: ${key}: ${val}`);
  })
  console.log(`PATCH!: ${req.params.id} body: ${req.body}`);
  // return;
  await Projects.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedProject) => {
      res.json({ 'project': updatedProject });
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err.message });
    })
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

router.delete('/random/:q', async (req, res) => {
  console.log(`delete random: ${req.params.q}`);
  try {
    const projectIds = await Projects.find({}, { select: '_id' });
    // console.log(`projids: ${projectIds}`);
    for (let i = 0; i < req.params.q; i++) {
      let rnd = Math.floor(Math.random() * projectIds.length);
      console.log(`deleting ${projectIds[rnd]}`);
      await Projects.findByIdAndRemove(projectIds[rnd])
    }
  }
  catch (err) {
    console.log(`delete random failed: ${err}`);

  }
  7
})

router.delete('/:id', (req, res) => {
  console.log(`project delete ${req.params.id} route.`);
  try {
    Projects.findByIdAndRemove(req.params.id)
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

// back-end/routes/tasks.js

const express = require('express');
const router = express.Router();
const { faker } = require('@faker-js/faker');
const { generateSlug } = require("random-word-slugs");

const Projects = require('../models/project');
const Tasks = require('../models/task');
const { Mongoose } = require('mongoose');

/*
const taskSchema = new Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, required: true },
  scheduled_date: { type: Date, required: true },
  completed_date: { type: Date, required: false },
  project_id: {
    type: Schema.Types.ObjectId,
    ref: "Project"
  },
*/

router.get('/seed/:q', (req, res) => {
  console.log(`seeding ${req.params.q} tasks (maybe)`);
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
    let name = generateSlug(4, { format: "title" });
    let completed = false;
    let scheduledDate = faker.date.between("2022-01-01", Date.now())
    let completedDate = null;
    p.name = name;
    p.completed = completed;
    p.scheduled_date = scheduledDate;
    p.completed_date = completedDate;
    p.project = projectIds[rndIdx];
    fakes.push(p);
  }

  Tasks.create(fakes)
    .then((data) => {
      console.log(JSON.stringify(data));
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err });
    })
})


//`${new Date(orderDate).toDateString()} ${new Date(orderDate).toLocaleTimeString('en-US')}`;
//`${new Date(promiseDate).toDateString()} ${new Date(promiseDate).toLocaleTimeString('en-US')}`;


router.get('/', async (req, res) => {
  try {
    console.log('task root route')
    // if you leave out the _id, the populate on a virtual lookup won't work.

    const allTasks = await Tasks.find({}, "-__v -createdAt -updatedAt")

    console.log(`${allTasks.length} Tasks returned`);
    res.json({ links: ['name'], allTasks });
  }
  catch (err) {
    // res.status(400).json(obj)
    res.status(400).json({ success: false, message: err });
  }

});


router.get('/', async (req, res) => {
  // just testing a cursor
  console.log('tasks root route')

  Tasks.find({}, "-_id -__v -createdAt -updatedAt")
    // Tasks.find()
    .then((allTasks) => {
      console.log(`allTasks: ${allTasks}`);

      // note: do not try: res.json({ tasks: allTasks })
      res.json(`"allTasks": ${allTasks}`);
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err.message });
    });
})


router.post('/', async (req, res) => {
  await Tasks.create(req.body)
    .then((newTask) => {
      res.json({ 'newTask': newTask });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, message: err.message });
    })
})

router.delete('/:id', async (req, res) => {
  await Tasks.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(201).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, message: err.message });
    })
})

router.delete('/:id', (req, res) => {
  console.log(`task delete ${req.params.id} route reached`);
  Tasks.findByIdAndRemove(req.params.id)
    .then((removed) => {
      console.log(removed && JSON.stringify(removed));
      res.status(201).json({ success: true }); //, message: `delete succeeded for ${req.params.id}`
    })
    .catch((err) => {
      err && res.status(400).json({ success: false, message: `delete attempt failed. ` });
    });
})

router.get('/:id', async (req, res) => {

  await Tasks.findById(req.params.id)
    .then((task) => {
      res.json({ 'task': task });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, message: err.message });
    })
});

router.patch('/:id', async (req, res) => {

  console.log(`tasks PUT: ${req.params.id} body: ${JSON.stringify(req.body)}`);
  await Clients.findByIdAndUpdate(
    req.params.id, req.body,
    { new: true }
  )
    .then((updatedTask) => {
      console.log(`updatedTask = ${updatedTask}`)
      res.json({ 'task': updatedClient });
    })
    .catch((err) => {
      res.json(err);
    })
})



module.exports = router;
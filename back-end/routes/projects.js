
// back-end/routes/projects.js

const express = require('express');
const router = express.Router();

const Projects = require('../models/project');

router.get('/seed', (req, res) => {
  Projects.create([
    {
      name: "menu chopper",
      order_date: "2022-09-08",
      promise_date: "2022-11-08",
      client_id: {}
    },
    {
      name: "tweet scrambler",
      order_date: "2022-09-23",
      promise_date: "2022-12-08",
    },
    {
      name: "egg database",
      order_date: "2022-06-23",
      promise_date: "2024-01-08",
    },

  ],
    (err, data) => {
      res.json(err);
    })
})
router.get('/', async (req, res) => {
  console.log('projects route hit')
  await Projects.find()
    .then((allProjects) => {
      console.log(allProjects)
      res.json({ 'projects': allProjects });
    })
    .catch((err) => {
      res.json(err);
    });
})


router.post('/', async (req, res) => {
  await Projects.create(req.body)
    .then((newProject) => {
      res.json({ 'newProject': newProject });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    })
})

router.delete('/:id', async (req, res) => {
  await Projects.findByIdAndRemove(req.params.id)
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

  await Projects.findById(req.params.id)
    .then((project) => {
      res.json({ 'project': project});
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    })
});


router.put('/:id', async (req, res) => {
  await Projects.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedProject) => {
      res.json({ 'project': updatedProject});
    })
    .catch((err) => {
      res.json(err);
    })
})


module.exports = router;





module.exports = (app) => {

  app.get('/projects/seed', (req, res) => {
    Projects.create([
      {
        name: "lothar",
        class: "paladin",
        level: 11,
        // see what happens if an empty array is initialized vs sending no value at all
        weapons: [],
        vehicles: [],

      }],
      (err, data) => {
        res.redirect("/dash");
        // res.redirect("/projects");
      })
  })

  app.get('/projects', async (req, res) => {

    await Projects.find()
      .then((foundProjects) => {
        foundProjects.forEach((project, index) => {
          let rndIdx = Math.floor(Math.random() * weaponIds.length);

          Projects.findByIdAndUpdate(project.id,
            { $push: { weapons: weaponIds[rndIdx] } },
            { new: true, useFindAndModify: false })
            .populate("vehicles")
            .populate("weapons")
            .catch((err) => {
              console.log('what is happening?', err);
            })
        })


      })
      .then(() => {
        setTimeout(() => {
          res.redirect('/projects');
        }, 700);
      })
      .catch((err) => {
        res.json(err);
      })
  })




  app.delete('/project/:id', async (req, res) => {
    await Projects.findByIdAndRemove(req.params.id)
      .then(() => {
        res.redirect('/projects');
      })
      .catch((err) => {
        res.json();
      })
  })

  // =========PLAYER: GET ONE BY ID ============
  app.get('/project/:id', async (req, res) => {

    await Projects.findById(req.params.id)
      .populate("vehicles")
      .populate("weapons")
      .then((result) => {
        res.render('projects/Project', {
          project: result,
        })
      })
      .catch((err) => {
        res.json(err);
      })
  });


  app.put('/project/:id', async (req, res) => {
    await Projects.findByIdAndUpdate(req.params.id, req.body)
      .then((updatedProject) => {
        res.redirect('projects');
      })
      .catch((err) => {
        res.json(err);
      })
  })



}
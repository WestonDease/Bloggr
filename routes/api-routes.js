const Blog = require('../models/Blog');

module.exports = function (app) {

  app.get('/api/blogs', function (req, res) {
    Blog.find({})
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });


  app.post('/api/blogs', function (req, res) {
    Blog.create(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.put('/api/blogs/:id', function (req, res) {
    Blog.findOneAndUpdate({ _id: req.body._id }, { completed: req.body.completed })
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.delete('/api/blogs/:id', function (req, res) {
    Blog.findOneAndDelete(req.params.id)
      .then(data => res.json({ success: true }))
      .catch(err => res.json(err))
  })
}
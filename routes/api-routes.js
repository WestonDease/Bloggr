const Blog = require('../models/Blog');
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

module.exports = function (app) {

  app.get('/api/blogs', function (req, res) {
    Blog.find({})
      .then(function (data) {
        res.json(data);
        console.log('were in the api/routes getting the blogs')
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
  });

  app.post('/api/nightmare', function(req, res) {
    let message = '--- \n\
    title: Nightmare \n\
    published: true \n\
    description: This is an automated post using nightmare.js \n\
    tags: nightmare.js \n\
    ---\n\ ' +
    req.body.blog;

    console.log("We are in our api routes handling a nightmare request");
    
    nightmare
    .goto('https://dev.to/users/auth/github?state=join-club-page_basic')
    .type('#login_field', '')
    .type('#password', '')
    .click('.btn-primary')
    // .wait(20000)
    // .evaluate( () => {
    //   console.log('here it is' , document.body.innerHTML);
    // })
    .wait(20000)
    .goto('https://dev.to/new')
    // .evaluate(() => {
    //  return document.title
    // })
    .evaluate(function() {
      document.querySelector('#article_body_markdown').value = ''
      })
    .insert('#article_body_markdown', message)
    .click('#article-submit')
    // .wait(10000)
    //.type('#search_form_input_homepage', 'github nightmare')
    //.click('#search_button_homepage')
    //.wait('#r1-0 a.result__a')
    //.evaluate(() => document.querySelector('#r1-0 a.result__a').href)
    //.end()
    .then((title) => console.log(title))
    .catch(error => {
     console.error('Search failed:', error)
    })
  });
}
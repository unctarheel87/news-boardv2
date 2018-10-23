const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio')
const Comment = require('../models/comment');
const Article = require('../models/article');
var router = express.Router()

router.get('/', (req, res) => {
  res.sendFile('index.html');
});

router.get('/scrape/:topic', (req, res) => {
  scrapeData(req, res, req.params.topic);
});

router.post('/save', (req, res) => {
   //insert document
  Article.create(req.body)
    .then(dbArticle => res.send(dbArticle))
    .catch(err => { return res.json(err) });
});

router.get('/clear', (req, res) => {
  Article.deleteMany({}).then(dbArticles => {
    res.end(dbArticles);
  }).catch(err => {
    console.log(err);
  })
});

router.get('/articles/saved', (req, res) => {
  Article.find({})
    .populate('comments')
    .then(dbArticles => {
      res.json(dbArticles);
    }).catch(err => {
      console.log(err);
    })
});

router.post('/articles/:id/comments/', (req, res) => {
  Comment.create(req.body).then(dbComment => {
    return Article.findOneAndUpdate({_id: req.params.id}, { 
      $set: { comments: dbComment._id }
    }, { new: true } )
  }).then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => res.json(err));
});

router.put('/articles/comments/:id', (req, res) => {
  Comment.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(dbComment => {
      res.json(dbComment);
      console.log(dbComment)
    })
    .catch(err => res.json(err));
});

router.delete('/articles/saved/:id', (req, res) => {
  Article.findByIdAndRemove(req.params.id)
    .then(dbArticle => {
      return Comment.findByIdAndRemove(dbArticle.comments)
     }).then(dbArticle => {
        res.json(dbArticle)
        })
      .catch(err => res.json(err));
});

router.delete('/comments/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id)
    .then(dbComment => {
      res.json(dbComment)
      })
    .catch(err => res.json(err));
});

function scrapeData(req, res, topic) {
  axios.get(`https://www.nytimes.com/section/${topic}`).then(response => {
    const $ = cheerio.load(response.data);
    const articles = []
    $('div.story-body').each(function(i, element) {
        const title = $(element).children('h2.headline').text().trim();
        const summary = $(element).children('p.summary').text().trim();
        const author = $(element).children('p.byline').children('span.author').text().trim();
        const img = $(element).siblings('.media').find('img').attr('src');
        const link = $(element).siblings('.media').children('a').attr('href');
       
        if(title && summary) {
          articles.push({ title, summary, author, img, link });
        }
    });
    res.json(articles);
  });
}

module.exports = router;
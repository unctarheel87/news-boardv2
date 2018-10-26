const express = require('express');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio')
const Comment = require('../models/comment');
const Article = require('../models/article');
const router = express.Router()

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
    .sort({rating: -1})
    .populate('comments')
    .then(dbArticles => {
      res.json(dbArticles);
    }).catch(err => {
      console.log(err);
    })
});

router.get('/articles/saved/:id', (req, res) => {
  Article.findOne({ _id: req.params.id })
    .populate('comments')
    .then(dbArticles => {
      res.json(dbArticles);
    }).catch(err => {
      console.log(err);
    })
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.post('/articles/:id/comments/', (req, res) => {
  Comment.create(req.body).then(dbComment => {
    return Article.findOneAndUpdate({_id: req.params.id}, { 
      $push: { comments: dbComment._id }
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

router.put('/articles/saved/:id', (req, res) => {
  Article.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(dbArticle => {
      res.json(dbArticle);
      console.log(dbArticle)
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
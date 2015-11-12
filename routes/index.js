var express = require('express');
var router = express.Router();
var db = require('../lib/praise.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/memories', function(req, res){
  db.insert('memories', {
    old_days: req.body.data.attributes.old_days, 
    these_days: req.body.data.attributes.these_days, 
    year: req.body.data.attributes.year
  }).then(function(res){
    console.log(res)
    res.status(200).end()
  })
})

module.exports = router;

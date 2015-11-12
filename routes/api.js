var express = require('express');
var router = express.Router();
var db = require('../lib/praise.js');
var schema = require('../lib/data-schema.js');


router.post('/memories', function(req, res){
  db.insert('memories', {
    old_days: req.body.data.attributes.old_days, 
    these_days: req.body.data.attributes.these_days, 
    year: req.body.data.attributes.year
  }).then(function(result){
    res.status(200).end()
  })
})

router.get('/memories', function(req, res){
  db.selectAll('memories').then(function(memories){
    res.json(schema.formatRes(memories)).status(200).end()
  })
})

router.get('/memories/years', function(req, res){
  db.selectDistinct('memories', 'year').then(function(years){
    res.json(schema.formatYears(years)).status(200).end();
  })
})

router.get('/memories/year/:year', function(req, res){
  db.select('memories', { year: req.params.year }).then(function(memories){
    res.json(schema.formatRes(memories)).status(200).end()
  })
})

router.get('/delete-all', function(req, res){
  db.deleteAll('memories').then(function(){
    res.send(200).end()
  })
})











module.exports = router;













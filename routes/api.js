var express = require('express');
var router = express.Router();
var db = require('../lib/praise.js');


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
    var schema = require('../lib/data-schema.js');
    memories.forEach(function(memory){
      schema.data.push({
          "type": "memory",
          "id": memory.id,
          "attributes": {
            "old_days": memory.old_days,
            "these_days": memory.these_days,
            "year": memory.year
          },
          "links": {}
      })
    })
    res.json(schema).status(200).end()
  })
})

module.exports = router;
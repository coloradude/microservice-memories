module.exports = {
  formatRes: function(memories){
    var res = {
      "links": {},
      "data": []
    }
    memories.forEach(function(memory){
      res.data.push({
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
    console.log(res)
    return res;
  },

  formatYears: function(years){
    var res = {
      "links": {},
      "data": []
    }
    years.forEach(function(year){
      res.data.push(year.year)
    })
    return res;
  }
}



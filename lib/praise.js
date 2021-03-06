var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/memories_db';
var Promise = require('promise')

module.exports = {
  insert: function(table, obj){
    var columns = Object.getOwnPropertyNames(obj),
        values = [],
        variables = [];
    for (var prop in obj){
      values.push(obj[prop]);
    }
    var query = 'INSERT INTO ' + table + '(' + columns.join(', ') + ')' + 'values(';
    values.forEach(function(_, i){
      variables.push('$' + (i + 1));
    })
    query += variables.join(', ') + ') RETURNING *;';
    return new Promise(function(resolve, reject){
      pg.connect(connectionString, function(err, client, done){
        client.query(query, values, function(err, result){
          done();
          if (err) reject(err);
          else resolve(result);
        })
      })
    })
  },

  selectAll: function(table){
    return new Promise(function(resolve, reject){
      pg.connect(connectionString, function(err, client, done){
        client.query('SELECT * FROM ' + table + ';', function(err, result){
          done();
          if (err) reject(err);
          else resolve(result.rows);
        });
      })
    })
  },

  selectById: function(table, id){
    return new Promise(function(resolve, reject){
      pg.connect(connectionString, function(err, client, done){
        client.query('SELECT DISTINCT * from ' + table + ' where id = ' + id, function(err, result){
          done();
          if (err) reject(err);
          else resolve(result.rows[0]);
        })
      })
    })
  },

  select: function(table, data){
    var column = Object.getOwnPropertyNames(data)
    var query = 'SELECT * from ' + table + ' where ' + column[0] + ' = ' + "'" + data[column] + "';"
    return new Promise(function(resolve, reject){
      pg.connect(connectionString, function(err, client, done){
        client.query(query, function(err, result){
          done();
          if (err) reject(err);
          else resolve(result.rows);
        })
      })
    })
  },

  selectOne: function(table, data){
    var column = Object.getOwnPropertyNames(data)
    var query = 'SELECT DISTINCT * from ' + table + ' where ' + column[0] + ' = ' + "'" + data[column] + "';"
    return new Promise(function(resolve, reject){
      pg.connect(connectionString, function(err, client, done){
        client.query(query, function(err, result){
          done();
          if (err) reject(err);
          else resolve(result.rows[0]);
        })
      })
    })
  },

  selectDistinct: function(table, column){
    var query = 'SELECT DISTINCT ' + column + ' from ' + table + ';'
    return new Promise(function(resolve, reject){
      pg.connect(connectionString, function(err, client, done){
        client.query(query, function(err, result){
          done();
          if (err) reject(err);
          else resolve(result.rows);
        })
      })
    })
  },

  delete: function(table, data){
    var column = Object.getOwnPropertyNames(data)
    var query = 'DELETE FROM ' + table + ' WHERE ' + column[0] + ' = ' + "'" + data[column] + "' RETURNING *;"
    return new Promise(function(resolve, reject){
      pg.connect(connectionString, function(err, client, done){
        client.query(query, function(err, result){
          done()
          if (err) reject(err);
          else resolve(result.rows);
        })
      })
    })
  },

  deleteOne: function(table, data){
    var column = Object.getOwnPropertyNames(data)
    var query = 'DELETE FROM ' + table + ' WHERE ' + column[0] + ' = ' + "'" + data[column] + "' RETURNING *;"
    return new Promise(function(resolve, reject){
      pg.connect(connectionString, function(err, client, done){
        client.query(query, function(err, result){
          done()
          if (err) reject(err);
          else resolve(result.rows[0]);
        })
      })
    })
  },

  deleteAll: function(table){
    var query = 'DELETE FROM ' + table + ';'
    return new Promise(function(resolve, reject){
      pg.connect(connectionString, function(err, client, done){
        client.query(query, function(err, result){
          done()
          if (err) reject(err);
          else resolve(result.rows[0]);
        })
      })
    })
  },

  update: function(table, search, set){
    var searchColumn = Object.getOwnPropertyNames(search)[0]
    var searchValue = search[searchColumn]
    var setCol = Object.getOwnPropertyNames(search)[0]
    var setVal = serach[setCol]
    var query = 'UPDATE ' + table + ' SET ' + setCol + " = '" + setVal + "' WHERE " + searchColumn + " = '"  + searchValue + "' RETURNING *;"
    return new Promise(function(resolve, reject){
      pg.connect(connectionString, function(err, client, done){
        client.query(query, function(err, result){
          done()
          if (err) reject(err)
          else resolve(result)
        })
      })
    })
  }
}
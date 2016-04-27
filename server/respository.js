var db = {
  membersInfo: {
    description: 'fuisabfiusabfasui'
  },
  members: [{
    name: 'ionut',
    email: 'ionut@ionut.com',
    id: 1
  }, {
    name: 'tudrel',
    email: 'tudrel@tudrel.com',
    id: 2
  }, {
    name: 'marusica',
    email: 'marusciac@tudrel.com',
    id: 3
  }],
  users: [{}, {}]
};

var neo4j = require('neo4j');
var neo4jDb = new neo4j.GraphDatabase('http://neo4j:123@localhost:7474');

module.exports = {
  create: function(repo) {
    return {
      repoName: repo,
      find: function(callback) {
        callback(null, {
          data: db[this.repoName]
        });
      }
    };
  },
  getAllUsers: function(callback) {
    neo4jDb.cypher({
      query: 'MATCH (user:User) RETURN user.username as name, user.email as email, id(user) as id',
      params: {
        email: '',
      },
    }, function(err, results) {
      callback(err, {
        data: results
      });
    });
  },
};

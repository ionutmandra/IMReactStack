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
  blogsInfo: {
    description: 'blogs main description'
  },
  blogList: [{
    name: 'blog1',
    email: 'ionut@ionut.com',
    id: 1
  }, {
    name: 'blog2',
    email: 'tudrel@tudrel.com',
    id: 2
  }, {
    name: 'blog3',
    email: 'marusciac@tudrel.com',
    id: 3
  }],
  users: [{}, {}]
};


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
  getAllUsers: function(){
         var cypherCall = db.cypher({
            query: 'MATCH (user:User) RETURN user',
            params: {
                email: '',
            },
        }, callback);

        console.log(cypherCall);

        return {};
  },
};

var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:123@localhost:7474');

// db.cypher({
//     query: 'MATCH (user:User) RETURN user',
//     params: {
//         email: '',
//     },
// }, callback);

function callback(err, results) {
    if (err) throw err;
    var result = results[0];
    if (!result) {
        console.log('No user found.');
    } else {
        var user = result['user'];
        console.log(user);
    }
};

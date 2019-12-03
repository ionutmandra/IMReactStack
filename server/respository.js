var assert = require('assert');

var db = {
    membersInfo: {
        description: 'fuisabfiusabfasui',
    },
    members: [{
        name: 'ionut',
        email: 'ionut@ionut.com',
        id: 1,
    }, {
            name: 'tudrel',
            email: 'tudrel@tudrel.com',
            id: 2,
        }, {
            name: 'marusica',
            email: 'marusciac@tudrel.com',
            id: 3,
        }],
    users: [{}, {}],
};

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://superadmin:dnwCSiteSa@localhost:27017/companysite';

var findUsers = function (args) {
    var con = MongoClient.connect(url, function (err, db) {
        //TODO refactor err==null check with assert without identation
        if (err == null) {

            db.collection('users').find().toArray(function (err, allUsers) {
                console.log(allUsers);
                args.callback && args.callback(null, {
                    data: allUsers,
                });
                db.close();
            });
        }
    });
};

var insertContactDetailsInDB = function (details) {
    var con = MongoClient.connect(url, function (err, db) {
        if (err == null) {
            var colection = db.collection('contacts');
            colection.insert(details);
        }
    });
};

var insertInitMembers = function () {
    var con = MongoClient.connect(url, function (err, db) {

        assert.equal(null, err);

        var colection = db.collection('users');

        colection.remove({});
        colection.insert({ id: 2, name: 'Ionut Mandra' });
        colection.insert({ id: 3, name: 'Teodor Sandu' });
    });
};

module.exports = {
    create: function (repo) {
        return {
            repoName: repo,
            find: function (callback) {
                callback(null, {
                    data: db[this.repoName]
                });
            },
        };
    },
    getAllUsers: function (callback) {
        findUsers({
            data: {},
            callback: callback,
        });
    },
    insertContactDetails: function (details) {
        insertContactDetailsInDB(details);
    },
    //init - one time only
    initUsers: function () {
        insertInitMembers();
    },
};

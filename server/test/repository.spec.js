var chai = require('chai');

chai.config.includeStack = true;

var expect = require('chai').expect;

var repo = require('../respository');

describe('When using dummy repo', function () {
    var sut;

    before(function () {
        sut = new repo.create('members');
    });

    it('should result in some result', function () {
        var result = 0;
        sut.find(function (err, data) {
            result = data.data;
        });
        expect(result.length).equal(3);
    });
});

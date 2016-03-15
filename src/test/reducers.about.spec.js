var chai = require('chai');

chai.config.includeStack = true;

var expect = require("chai").expect;

describe('When using reducer', function () {
    var sut;

    before(function () {
        sut = require('../reducers/about');
    });

    it('should earn great salary', function () {

        var action = {
            type:'ADD_MEMBER',
            member:{name:3,email:3}
        };

        var initialState = {
            members:[{name:1,email:3,id:1},{name:2,email:4,id:2}]};

            var result = sut(initialState,action);


            expect(result.members.length).equal(3);
        });
});
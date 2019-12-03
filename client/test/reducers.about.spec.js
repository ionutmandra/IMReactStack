let chai = require('chai');

chai.config.includeStack = true;

let expect = require('chai').expect;

describe('About reducer', () => {
    let sut;

    before(() => {
        sut = require('../reducers/about');
    });

    it('should add member', () => {
        const action = {
            type: 'ADD_MEMBER',
            member: {
                name: 3,
                email: 3,
            },
        };

        const initialState = {
            members: [{
                name: 1,
                email: 3,
                id: 1,
            }, {
                    name: 2,
                    email: 4,
                    id: 2,
                }],
        };

        const result = sut(initialState, action);

        expect(result.members.length).equal(3);
    });
});
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as jwt from 'jsonwebtoken';
import {expect} from 'chai';

import * as actions from '../actions';
import * as types from '../constants';
import * as mockLocalStore from './mock-localstorage';

const mockStore = configureMockStore([thunk]);

var user = { usr: 421431, pwd: 64354353 };

const serverToken = jwt.sign(user, 'superSecret', { expiresIn: 6000 });

global.localStorage = mockLocalStore.createNewMock();

describe('Async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('like LOGIN_USER_SUCCESS should do login with success', (done) => {

    nock('http://localhost:8080/').post('/auth/login').reply(200, { token: serverToken })

    const store = mockStore({})

    store.dispatch(actions.doLogin(user.usr, user.pwd))
      .then(() => {
        var resultActions = store.getActions();
        expect(resultActions[0].type).equal(types.LOGIN_USER_REQUEST);
        expect(resultActions[1].type).equal(types.LOGIN_USER_SUCCESS);
        expect(resultActions[1].payload.token).equal(serverToken);
        done();
      })
      .catch(done);
  });
});
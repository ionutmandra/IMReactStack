import { connect } from 'react-redux';
import actions from '../actions';
import Login from '../components/login';

const mapStateToProps = (state) => {
  return { authState: state.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doLogin: (usr, pwd) => {
      dispatch(actions.doLogin(usr, pwd));
    },
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Login);

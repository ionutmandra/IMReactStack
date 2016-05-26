import { changeLanguage } from '../actions';
import { connect } from 'react-redux';
import LanguagePicker from '../components/languagePicker';

const stateToProps = state => ({
    currentLanguage: state.lang.current,
});

const actionsToProps = dispatch => ({
    handleChange: event =>  dispatch(changeLanguage(event.target.value)),
});

export default connect(stateToProps, actionsToProps)(LanguagePicker);
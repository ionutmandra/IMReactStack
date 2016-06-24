import Wrapper from '../components/wrapper';
import { connect } from 'react-redux';
import { setMedia } from '../actions';

const stateToProps = state => ({
    ui: state.ui,
});

const mapDispatchToProps = (dispatch) => {
    return {
        setMedia: function (media) {
            dispatch(setMedia(media));
        },
    };
};

export default
    connect(stateToProps, mapDispatchToProps)(
        Wrapper);
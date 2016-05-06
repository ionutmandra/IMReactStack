import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

class AdminHome extends React.Component {

	componentWillMount () {
		this.fetchData();
	}

	fetchData () {
		let token = this.props.token;
		this.props.fetchProtectedData(token); 
	}

	render () {
		return (
			<div>

		{/* {this.props.isFetching === true? <h1>Loading data...</h1>: */}
		<div>
		<h1>Welcome back,
		{this.props.userName}!</h1>
		<h3>{this.props.data.members}</h3>
		</div>

		</div>
		);
	}
}

const mapStateToProps = (state) => ({
	data: state.about,
	// isFetching: state.data.isFetching
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProtectedData: function(token){
			dispatch(actions.editMembers(token)); },
		};
	};



		module.exports = connect(mapStateToProps, mapDispatchToProps)(AdminHome);

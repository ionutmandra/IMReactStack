import React, { Component } from 'react';

class AdminHome extends Component {

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

export default AdminHome;

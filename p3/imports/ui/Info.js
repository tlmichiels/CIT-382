import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class App extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div className="container">
			<h1>Information Page</h1>
			<h2>Developed by: </h2>
			<br/>

			<h3>Thomas Michiels</h3>
			<br/>
			
			<p>
			University of Oregon<br/>
			Advertising<br/>
			Computer Information Technology
			</p>
			</div>
		);
	}
}
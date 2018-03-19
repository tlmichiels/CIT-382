import React, { Component } from 'react';
//import Example from './Example.js';

import ErrorBoundary from './error_boundaries.js';
import CaesarCypher from './CaesarCypher.js';
import CryptoAES from './CryptoAES.js';



// App component - represents the whole app
export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			word: '',
			secret: '',
		};

	}

	handleOnChange(event){
		this.setState({word: event.target.value});
	}

	onSecretChange(event){
    	this.setState({secret: event.target.value});
    }

	render() {
		return (
			<ErrorBoundary>
			<div className="container">
					<h1>Project 2</h1>
					<h2>Cypher</h2>
					<div>

        				<div>
           					<input type="input" id="wordInput" value={this.state.word} onChange={this.handleOnChange.bind(this)} placeholder="Enter text to encrypt" /><br />
            				<input type="input" id="secretInput" value={this.state.secret} onChange={this.onSecretChange.bind(this)} placeholder="Enter secret key" />
          				</div>

						<CaesarCypher clearText={this.state.word} />

						<CryptoAES secretKey={this.state.secret} clearText={this.state.word} />
						


					</div>
			</div>
			</ErrorBoundary>

		);
	}
}
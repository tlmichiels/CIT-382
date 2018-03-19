import { Image, Menu, Header, Segment } from 'semantic-ui-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../api/http.js';

import ErrorBoundary from './error_boundaries.js';
import NumberGuess from './NumberGuess.js';
import Info from './Info.js';
import CaesarCypher from './CaesarCypher.js';





export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			menuState: "numbergame"			
		};
	}

	handleMenuItemClick (e, { name }) {
   		this.setState({menuState: name });
	}

	render(){


		let component = null;
		switch (this.state.menuState) {
			case 'numbergame':
				component = <NumberGuess/>;
				break;
			case 'info':
				component = <Info />;
				break;
			case 'caesarcypher':
				component = <CaesarCypher />;
				break;
			}



		return(
			<div className="container">
			<Image src="/images/image.jpg" size="small"/>
				<h1>Project 3</h1>
				<Menu>
	                <Menu.Item name="numbergame" active={true}  active={this.state.menuState === 'numbergame'} onClick={this.handleMenuItemClick.bind(this)}>NumberGame</Menu.Item>
	                <Menu.Item name="caesarcypher" active={true}  active={this.state.menuState === 'caesarcypher'} onClick={this.handleMenuItemClick.bind(this)}>CaesarCypher</Menu.Item>
	                <Menu.Item name="info" active={true} active={this.state.menuState=== 'info'} onClick={this.handleMenuItemClick.bind(this)}>Info</Menu.Item>
	        	</Menu>
	        	{component}				
			</div>
			
		);
	}
}






/*
class NumberGame extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			item: items.ITEM1,			
		};
	}

	handleClick(){
		this.setState({item: items.ITEM2});
		console.log("Switched state");
	}

	render() {

		let item = null;
		switch(this.state.item) {

			//Setup
			case items.ITEM1:
				item = <p>Write setup code here</p>;
				break;

			//Playing
			case items.ITEM2:
				item = <p>write playing code here</p>;
				break;

			//Victory
			case items.ITEM3:
				item = <p>write victory code here</p>;
				break;

			//Error
			case items.ITEM4:
				item = <p>write error code here</p>;
				break;
			}

		return (
			<ErrorBoundary>
				<div className="container">
					<h2> LET'S PLAY NUMBER GUESS! </h2>
					<br/>
					<h3>Select the number range then click play and start playing:</h3>
					<br/>
					Min: <input id="Min" type="number" min="0" defaultValue="0"/> 	
					&nbsp; 
					Max: <input id="Max" type="number" min="0" defaultValue="5"/>
					&nbsp;
					<button id="play" onClick={this.handleClick.bind(this)}>
						Play!
					</button>
					{item}
				</div>
			</ErrorBoundary>
		);
	}
}

*/




















/*class Setup extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			item: items.ITEM1			
		};
	}

	handleClick(){
		this.setState({item: items.ITEM2});
		console.log("Switched state");
	}
	render() {
		return (
			<ErrorBoundary>
				<div className="container">
					<h3>Select the number range then click play and start playing:</h3>
					<br/>
					Min: <input id="Min" type="number" min="0" defaultValue="0"/> 	
					&nbsp; 
					Max: <input id="Max" type="number" min="0" defaultValue="5"/>
					&nbsp;
					<button id="play" onClick={this.handleClick}>
						Play!
					</button>
				</div>
			</ErrorBoundary>
		);
	}
}

class Playing extends React.Component{
	render() {
		return (
			<div>Write Playing Code here </div>

		);
	}
}

class Victory extends React.Component{
	render() {
		return (
			<div>
				<h2>VICTORY</h2>
			</div>
		);
	}
}

class Error extends React.Component{
	render() {
		return (
			<div>Write Error Code here </div>
		);
	}
}
*/
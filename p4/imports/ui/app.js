import { Button, Input, Segment } from 'semantic-ui-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {BarChart} from 'react-easy-chart';

import ErrorBoundary from './error_boundaries.js';



let nameScore = {};
//add a dictionary value nameScore["Ben"] = 5;

let graphData = [];
let listofscores = [];
let listofnames = [];


let numNames = 0;
let minScore = 0;
let maxScore = 0;
let avgScore = 0;





let items = '';
let showData = null;
const margin = {top: 20, right: 20, bottom: 30, left: 40};

export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			score: '',
			list: ''

		};
	}



	nameChange(event){
		this.setState({
			name: event.target.value
		});
	}

	scoreChange(event){
		
		this.setState({
			score: event.target.value
		});
	}

	addValues(){
		if (this.state.score >= 0 & this.state.score <= 100 & this.state.score.length !== 0 ){
			nameScore[this.state.name] = this.state.score;
			this.setState({
				list: nameScore,
			});

			graphData.push({x: this.state.name, y: this.state.score});

			listofnames.push(this.state.name);
			listofscores.push(parseInt(this.state.score)); 




			//HOW MANY ENTRIES
			numNames = listofnames.length;

			//MIN SCORE
			minScore = Math.min(...listofscores);

			//MAX SCORE
			maxScore = Math.max(...listofscores);

			//AVG SCORE
			let sum = 0;
			for (var i = 0; i < listofscores.length; i++) {
				sum += listofscores[i];
				avgScore = sum / listofscores.length;
			}

			//LIST SCORES
			items = '';
			for(var score in graphData){

				items = items + graphData[score].x + ": " + graphData[score].y;

			};


			showData = (
				<ul>
				{ Object.keys(graphData).map(function(name, index){
					return (
						<li key={name}> { graphData[name].x }: {graphData[name].y} </li>
						)})}
				</ul>
				);





			//RESET
			this.setState({
				name: '',
				score: ''
			});
		}

		else{
		}	
	}




	clearScores(){
		nameScore = {}
		this.setState({
			list: '',
			score: '',
			name: ''
		})
		graphData=[];
		numNames = 0;
		minScore = 0;
		maxScore = 0;
		avgScore = 0;
		showData = null;
	}





	render(){

		let scoreInput = null;

		if (this.state.score >= 0 & this.state.score <= 100){
			scoreInput = (
				<div>
					<div className="ui input">
						<input type="number" value={this.state.score} placeholder="Enter score..." onChange={this.scoreChange.bind(this)}/>
					</div>
				</div>
			);			
		}
		else {
			scoreInput = (
				<div>
					<div className="ui input error">
						<input type="number" value={this.state.score} placeholder="Enter score..." onChange={this.scoreChange.bind(this)}/>
						<a className="ui tag label">
						Error. Enter a number between 0-100.
						</a>
					</div>
				</div>
			);		
		}



		return(
			<div className="container">
				<h1>Project 4</h1>
				<h2>Option 1</h2>
				<br/>
				<ErrorBoundary>
				<div className="ui horizontal segments">
					<div className="ui segment">
						<table className="ui celled table">
							<tbody>
								<tr>
									<td>Name</td>
									<td>
										<div className="ui input">
										<input type="input" value={this.state.name} placeholder="Enter name..." onChange={this.nameChange.bind(this)}/>
										</div>
									</td>
								</tr>
								<tr>
									<td>Score</td>
									<td>
										{scoreInput}
									</td>
								</tr>
							</tbody>
						</table>	
					<button className="ui primary button" onClick={this.addValues.bind(this)}>Add Score</button>
					<button className="ui button" onClick={this.clearScores.bind(this)}>Clear Score</button>
			</div>
				<div className="ui segment">
					<div className="inlinearea">
						{showData}
					</div>
				</div>
			</div>

			

				<div className="ui horizontal segments">
					<div className="ui segment">
						<BarChart axes height={250} width={500} margin={margin} data={graphData}/>
					</div>

					<div className="ui segment">
						Count: {numNames} <br/>
						Min: {minScore} <br/>
						Max: {maxScore} <br/>
						Average: {avgScore}
					</div>
				</div>
				</ErrorBoundary>
			</div>
		);
	}
}







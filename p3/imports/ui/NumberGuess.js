import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';

import ErrorBoundary from './error_boundaries.js';

//I worked with Abby Almond

const gameList = {
  setup: 0,
  playing: 1,
  victory: 2,
  error: 3

};

let lowGuesses = [];
let highGuesses = [];
let NaNarray = [];


export default class NumberGuess extends Component {
  constructor(props){
    super(props);
    this.state = {
      gameState: gameList.setup,
      restData: [],
      min: 0,
      max: 6,
      guess: '',
      victoryNum: 3
    };
  }

 /* handleClick(){
    this.setState({gameState: gameList.playing});
    console.log("Switched Game State to: " + this.state.gameState);
    this.getRestData(this.state.min, this.state.max);

    //console.log("The victory number is: " + this.getRestData(state.min, this.state.max));
  }
  */

  

  handleGuess(event){
    this.setState({guess: event.target.value});  
    var lowStr = '';
    var highStr = '';
    if (this.state.guess == ""){
      console.log('nothin');
    } 

    else if (isNaN(this.state.guess) == true){
      NaNarray.push(this.state.guess);    
    }

    else if (isNaN(this.state.guess) == false){
      if (this.state.guess < this.state.victoryNum){
        lowGuesses.push(this.state.guess);      
      }
      else if (this.state.guess > this.state.victoryNum){
        highGuesses.push(this.state.guess);
      }
    }

    

    
  minChange(event){
    this.setState({min: event.target.value});
    console.log(this.state.min);
  } 
    
  }

  maxChange(event){
    this.setState({max: event.target.value});
  }



  getRestData(min, max){
    if (Meteor.isClient) {
      Meteor.call("getRestData", min, max, function(error, results) {
        try{
          if (error) {
              // Note: We will not be using Meteor error parameter, so it will always be undefined
              // See http://docs.meteor.com/api/methods.html#Meteor-Error if you want to use Meteor errors
              console.log("Error in retrieving data: " + error);


              // IMPORTANT update stage to error

            } else {
              //let parsedResults = JSON.parse(results);
              if (results.error) {
                console.log("Error status code: " + results.error.statusCode);
                console.log("Error: " + results.error.error);
              } else {
                
                this.setState({victoryNum: results.content})
                console.log(this.state.victoryNum);
                
                this.setState({gameState: gameList.playing});
              }
            }
          } 

          catch (err) {
            console.log("Error in Meteor call: " + err);



            // IMPORTANT update stage to error

          }
        }.bind(this));
    }
  }



  render(){
   
    
    let item = null;



    switch(this.state.gameState) {

      //Setup
      case gameList.setup:
      item = (
        <div>
          <h3>Select the number range then click play and start playing:</h3>
          <br/>
          Min: <input id="Min" type="number" min="0" value={this.state.min} onChange={this.minChange.bind(this)}/>  
          &nbsp; 
          Max: <input id="Max" type="number" min="0" value={this.state.max} onChange={this.maxChange.bind(this)}/>
          &nbsp;
          <button type="submit" onClick={() => this.getRestData(this.state.min,this.state.max)}>
            Play!
          </button>
        </div>
        );
      

      break;

      //Playing
      case gameList.playing:


        //BASE
        if (this.state.guess == ''){
          item = (
            <div>
              <p>Guess:</p>
              <input type="text" min="0" value={this.state.guess} onChange={this.handleGuess.bind(this)} placeholder="Enter guess here"/>
              </div>
            );
        }

        

        //GUESS TOO HIGH
        else if (this.state.victoryNum < parseInt(this.state.guess)){
          item = (
            <div>
              <p>Guess: </p>
              <input type="text" min="0" value={this.state.guess} onChange={this.handleGuess.bind(this)} placeholder="Enter guess here"/>
              Number too high!
            </div>
            );
        }

        //GUESS TOO LOW
        else if (this.state.victoryNum > parseInt(this.state.guess)){
          //console.log(this.state.victoryNum);
          //console.log(this.state.guess);
          console.log(isNaN(this.state.guess));
          item = (
            <div>
              <p>Guess: </p>
              <input type="text" min="0" value={this.state.guess} onChange={this.handleGuess.bind(this)} placeholder="Enter guess here"/>
              Number too low!
            </div>
            );
        }

        //SWITCH TO VICTORY
        else if (this.state.victoryNum = parseInt(this.state.guess)){
          console.log("VICTORY ACHIEVED");
          this.setState({gameState: gameList.victory});}

//ERROR
        else {
          item = (
              <div>
                <p>Guess:</p>
                <input type="text" min="0" value={this.state.guess} onChange={this.handleGuess.bind(this)} placeholder="Enter guess here"/>
                Error, enter a number.
              </div>);
          }

          break;








      //Victory
      case gameList.victory:
      item = 
      <div>
      <h1>You Win!</h1>
      <h3>The correct number was {this.state.victoryNum}!</h3>
      </div>

      break;

      //Error
      case gameList.error:
      item = <p>write error code here</p>;
      break;
    }

    return (
      <ErrorBoundary>
      <div className="container">
      <h2> LET'S PLAY NUMBER GUESS! </h2>
      <br/>

      {item}

      <Table celled>
      <Table.Header>
      <Table.Row>
      <Table.HeaderCell>Low</Table.HeaderCell>
      <Table.HeaderCell>High</Table.HeaderCell>
      <Table.HeaderCell>Not Even A Number</Table.HeaderCell>
      </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>{lowGuesses+ ", "}</Table.Cell>
          <Table.Cell>{highGuesses+ ", "}</Table.Cell>
          <Table.Cell>{NaNarray+ ", "}</Table.Cell>
        </Table.Row>
      </Table.Body>
      </Table>

      

      </div>
      </ErrorBoundary>
      );
  }
}


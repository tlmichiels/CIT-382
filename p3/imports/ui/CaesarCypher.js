import React, { Component } from 'react';
import PropTypes from 'prop-types';

const charMax = 90;
const charMin = 65
const numMax = 57;
const numMin = 48;
const rangeMin = 0;
const rangeMax = 9;


let handleMath = (clearText, shift, shiftLeft) => {
    let encryptedText = "";
    clearText = clearText.toUpperCase();
    let charDiff = charMax - charMin + 1;
    let numDiff = numMax - numMin + 1;
    for (let i = 0; i < clearText.length; i++) {
        let asciiCode = clearText.charCodeAt(i);
        if (asciiCode >= numMin && asciiCode <= numMax) {
            // Whole numbers
            if (shiftLeft) {
                // Shift left
                encryptedText += String.fromCharCode(asciiCode - shift + numDiff <= numMax ? asciiCode - shift + numDiff : asciiCode - shift);
            } else {
                // Shift right
                encryptedText += String.fromCharCode(asciiCode + shift - numDiff > numMax ? asciiCode - shift + numDiff : asciiCode + shift);
            }
        } else if (asciiCode >= charMin && asciiCode <= charMax) {
            // Uppercase characters
            if (shiftLeft) {
                // Shift left
                encryptedText += String.fromCharCode(asciiCode - shift + charDiff <= charMax ? asciiCode - shift + charDiff : asciiCode - shift);
            } else {
                // Shift right
                encryptedText += String.fromCharCode(asciiCode + shift - charDiff > charMax ? asciiCode - shift + charDiff : asciiCode + shift);
            }
        } else {
            encryptedText += clearText.charAt(i);
        }
    }
    return encryptedText;
}

/*
IGNORE THIS
handleMath(event){

		let shiftNum = this.state.shiftNum;
		let shiftLeft = this.state.shiftLeft;
		console.log(shiftLeft);

		let arrayLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		let letterValues = {'a':0, 'b':1, 'c':2, 'd':3, 'e':4, 'f':5, 'g':6, 'h':7, 'i':8, 'j':9, 'k': 10, 'l':11, 'm':12, 'n':13, 'o':14, 'p':15, 'q':16, 'r':17, 's':18, 't':19, 'u':20, 'v':21, 'w':22, 'x':23, 'y':24, 'z':25}

		let arrayNumbers = [0,1,2,3,4,5,6,7,8,9];
		let numberValues = {'0':0, '1':1, '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9}




		const original = event.target.value;
		var splitWord = original.split("")

		var strResult = '';



		for (var i = 0 ; i < original.length; i++){
			var c = splitWord[i];

			if (isNaN(c)) {
				//letters
				if(c==" "){
					strResult+= " ";
				}

				//left
				if(shiftLeft == true){
					if (arrayLetters.indexOf(c)-shiftNum < 0){
						strResult += arrayLetters[arrayLetters.indexOf(c) - shiftNum + 26]; 
					}
					else{
						strResult += arrayLetters[arrayLetters.indexOf(c) - shiftNum];
					}
				} 

				//right
				else if(shiftLeft == false){
					if (arrayLetters.indexOf(c)+shiftNum > 26){
						strResult += arrayLetters[arrayLetters.indexOf(c) + shiftNum - 26];
					}
					else{
						strResult += arrayLetters[arrayLetters.indexOf(c) + shiftNum];
					}
				} 
				//error
				else{
					console.log("Enter a number or letter.");
				} 

			} 

			else {
				//numbers
				if(shiftLeft == true){
					if(arrayNumbers[c] - shiftNum < 0){
						strResult += arrayNumbers[c] - shiftNum + 10;
					}
					else{
						strResult += arrayNumbers[c] - shiftNum;
					}
				} 

				//right
				else if(shiftLeft == false){
					if(arrayNumbers[c] + shiftNum > 10){
						strResult += arrayNumbers[c] + shiftNum - 10;
					}
					else{
						strResult += arrayNumbers[c] + shiftNum;
					}
				} 



			}
			this.setState({
				result: strResult.toUpperCase(),
			});
		}
	}

	*/



export default class CaesarCypher extends Component {
	constructor(props){
		super(props);
		this.state = {
            offsetNum: 2,
            shiftLeft: true,
            word: '',
        };
	}

	doCaesarShift = () => {
        let encryptedText = handleMath(this.state.word, this.state.offsetNum, this.state.shiftLeft);
        return (
            <span>
                {encryptedText}
            </span>
        );
    }

	handleOnChange(event){
		this.setState({word: event.target.value});
	}


    onShiftNumChange = (changeEvent) => {
        let offset = parseInt(changeEvent.target.value);
        offset = offset <= 0 ? 0 : offset > 9 ? 9 : offset;
        this.setState({offsetNum: offset});
    }

	onChecked = (event) => {
		//console.log(event.target.checked);
		this.setState({shiftLeft: !this.state.shiftLeft});
		console.log(this.state);
	}



	render(){
		return(
			<div className="container">
				<div>
					<input type="input" id="wordInput" value={this.state.word} onChange={this.handleOnChange.bind(this)} placeholder="Enter text to encrypt" /><br />
            	
                	<span className="labels"><h3>Caesar Cypher</h3></span> {this.doCaesarShift()}<br />
                	<input type="input" value={this.state.offsetNum} onChange={this.onShiftNumChange.bind(this)} />&nbsp;&nbsp;
                	<input type="range" min={rangeMin} max={rangeMax} value={this.state.offsetNum} onChange={this.onShiftNumChange.bind(this)} />&nbsp;&nbsp;
                	<span className="labels">Shift Left:</span> 
                	 <input type="checkbox" checked={this.state.shiftLeft} onChange={this.onChecked.bind(this)} />
            	</div>
            </div>
			);
	}
}
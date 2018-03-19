//0 = 48
//9 = 57
//A = 65
//Z = 90
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';

export default class CryptoAES extends Component {
	constructor(props){
		super(props);
		this.state = {
			encryptedText: '',
			decryptedText: '',
		};
	}

	componentWillReceiveProps = (nextProps) => {
    if (nextProps.clearText.length > 0) {
      let encryptedTextObject = CryptoJS.AES.encrypt(nextProps.clearText, nextProps.secretKey);
      let encryptedText = encryptedTextObject.toString();
      let bytes  = CryptoJS.AES.decrypt(encryptedText, nextProps.secretKey);
      let decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      this.setState({encryptedText, decryptedText});
   		}
  	}

	render(){
		return(
			<div className="container">
				<h3>CryptoAES</h3>
			<br/>
			<span className="labels">Cypher Text: </span>{this.state.encryptedText}
			<br/>
			<span className="labels">Plain Text: </span> {this.state.decryptedText}
			</div>

		);
	}
}

CryptoAES.propTypes = {
  clearText: PropTypes.string.isRequired,
  secretKey: PropTypes.string.isRequired,
};







import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PagePeople from '../page-people';

import './app.css';

export default class App extends Component{
	



	render(){
		console.log('update App');
		
		return (
			<div className="stardb-app">
				<Header /> 
				<RandomPlanet />
				<PagePeople />
				<PagePeople />
				<PagePeople />
				
			</div>
		);
	}
};


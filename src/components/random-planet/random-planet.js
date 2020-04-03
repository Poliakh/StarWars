import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './random-planet.css';

export default class RandomPlanet extends Component {

	state = {
		planet:{},
		loader:true
	}
	swapiService = new SwapiService;

	constructor(){
		super();
		this.updatePlanet(5);
	}
	onPlanetLoaded(planet){
		this.setState({
			planet,
			loader:false
		});
	}

	updatePlanet(){
		const id = Math.floor(Math.random()*25)+1;
		console.log('id: ', id);
		
		this.swapiService
			.getPlanet(id)
			.then((planet) => {
				this.onPlanetLoaded(planet);
				
		});
	};

	render() {
		const{planet, loader} = this.state;
		const spinner = (loader)? <Spinner /> : null;
		const planetView = (!loader)? <PlanetView planet={planet}/>: null;
		return (
			<div className="random-planet jumbotron rounded">
				{spinner}
				{planetView}
				
			</div>

		);
	}
}

const PlanetView = ({planet}) => {

	const {name, population, rotationPeriod, diameter, id} = planet;

	return(
		<React.Fragment >
		<img className="planet-image"
					src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
				<div>
					<h4>{name}</h4>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">
							<span className="term">Population: </span>
							<span>{population}</span>
						</li>
						<li className="list-group-item">
							<span className="term">Rotation Period: </span>
							<span>{rotationPeriod}</span>
						</li>
						<li className="list-group-item">
							<span className="term">Diameter: </span>
							<span>{diameter}</span>
						</li>
					</ul>
				</div>
		</React.Fragment>
	);
};

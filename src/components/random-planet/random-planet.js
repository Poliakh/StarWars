import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';

export default class RandomPlanet extends Component {

	state = {
		planet:{},
		loading:true,
		error:false,
		hasError:false
	};
	
	swapiService = new SwapiService;

	componentDidMount(){
		this.interval = setInterval(() => this.updatePlanet(), 5000);
	}
	componentWillMount(){
		clearInterval(this.interval);
	}

	onPlanetLoaded = (planet) => {
		this.setState({
			planet,
			loading:false
		});
	};

	onError = (err) => {
		this.setState({
			error: true,
			loading:false
		});
	};

	updatePlanet = () => {
		const id = Math.floor(Math.random()*25)+3;
		this.swapiService
			.getPlanet(id)
			.then((planet) => this.onPlanetLoaded(planet))
			.catch(this.onError);
	};
	componentDidCatch(){
		this.setState({hasError:true})
	}

	render() {
		if(this.state.hasError){
			return <ErrorIndicator />;
		};

		const{planet, loading, error} = this.state;
		const hasData = !(error || loading);
		const errorMasage = (error)? <ErrorIndicator /> :null;
		const spinner = (loading)? <Spinner /> : null;
		const content = (hasData)? <PlanetView planet={planet}/>: null;

		return (
			<div className="random-planet jumbotron rounded">
				{spinner}
				{content}
				{errorMasage}
				
			</div>

		);
	};
};

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

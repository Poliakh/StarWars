import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './person-details.css';

export default class PersonDetails extends Component {
	swapiService = new SwapiService;

	state = {
		person: null,
		loading:true,
	}
	componentDidMount() {
		this.updatePerson();
	}
	componentDidUpdate(prevProps) {
		if(this.props.personId !== prevProps.personId){
			this.setState({loading:true})
			this.updatePerson();
		}
	}
	

	updatePerson = () => {
		const { personId } = this.props;
		if(!personId){
			return;
		}
		this.swapiService.getPerson(personId)
			.then((person) => {
				this.setState({ person, loading:false })

			});
	};

	render() {

		if (!this.state.person) {
			return (
				<div className="person-details card">
					<span> Select a person </span>
				</div>
			);
		};

		const content = (this.state.loading)? <Spinner />:<PersonElement peopleProp = {this.state.person} />;

		return (
			<div className="person-details card">
				{content}
			</div>
		)
	}
}

const PersonElement = ({peopleProp}) => {
	const { id, name, male, birthDay, eyeColor } = peopleProp;
	return(
		<React.Fragment>
				<img className="person-image"
					src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

				<div className="card-body">
					<h4>{name}</h4>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">
							<span className="term">Gender</span>
							<span>{male}</span>
						</li>
						<li className="list-group-item">
							<span className="term">Birth Year</span>
							<span>{birthDay}</span>
						</li>
						<li className="list-group-item">
							<span className="term">Eye Color</span>
							<span>{eyeColor}</span>
						</li>
					</ul>
				</div>
		</React.Fragment>
	)

}
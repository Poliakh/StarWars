import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {
	swapiService = new SwapiService;
	state = {
		itemList: [],
		error: false,
		loading: true
	}
	onError = (err) => {
		this.setState({
			error: true,
			loading: false
		});
		console.log('error item-list');
	};

	componentDidMount() {
		const {getData} = this.props;

		getData()
			.then((personList) => {
				this.setState({
					itemList: personList,
					loading: false
				});
			})
			.catch(this.onError)
	};


	render() {
		const { itemList, error, loading } = this.state;

		const personList = itemList.map(people => {
			return <li
				key={people.id}
				className="list-group-item"
				onClick={() => { this.props.onPerson(people.id) }}
			>{people.name}</li>

		})
		const spinner = (loading) ? <Spinner /> : null;
		const errorMasage = (error) ? <ErrorIndicator /> : null;
		const hasDone = !(error || loading);
		const list = (hasDone) ? personList : null;


		return (
			<ul className="item-list list-group">
				{spinner}
				{list}
				{errorMasage}
			</ul>
		);
	}
}

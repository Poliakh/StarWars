import React, {Component} from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';

export default class PagePeople extends Component {
	state = {
		selectedPerson:null,
		hasError:false
	}
	onPersonSelected = (personId) => {
		this.setState({selectedPerson:personId});
	};
	componentDidCatch(){
		this.setState({hasError:true})
	}

	render(){
		if(this.state.hasError){
			return <ErrorIndicator />;
		};

		return (
			<div className="row mb2">
				<div className="col-md-6">
					<ItemList onPerson={this.onPersonSelected} />
				</div>
				<div className="col-md-6">
					<PersonDetails personId={this.state.selectedPerson}/>
				</div>
			</div>
		);
	};
};

export default class SwapiService {

	_apiBase = 'https://swapi.co/api';

	async getResource(url) {
		const res = await fetch(`${this._apiBase}${url}`);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}` +
				`, received ${res.status}`)
		}
		return await res.json();
	}

	async getAllPeople() {
		const res = await this.getResource('/people/');
		return res.results.map(people => {
			return this._transfomPeople(people);
		});
	}

	async getPerson(id) {
		const person = await this.getResource(`/people/${id}/`);
		return this._transfomPeople(person);
	}

	async getAllPlanets() {
		const res = await this.getResource(`/planets/`);
		return res.results.map(item=>{
			this._transfomPlanet(item)
		});
	}

	async getPlanet(id) {
		const planet = await this.getResource(`/planets/${id}/`);
		return this._transfomPlanet(planet)
	}

	async getAllStarships() {
		const res = await this.getResource(`/starships/`);
		return res.results;
	}

	getStarship(id) {
		return this.getResource(`/starships/${id}/`);
	}
	_extractId = (item) => {
		const idRegExp = /\/([0-9]*)\/$/;
		return item.url.match(idRegExp)[1];
	}
	_transfomPlanet = (planet) => {
		return{
			id:this._extractId(planet),
			name:planet.name,
			population:planet.population,
			rotationPeriod:planet.rotation_period,
			diameter:planet.diameter,
		}
	}
	_transfomPeople = (people) => {
		return{
			id:this._extractId(people),
			name:people.name,
			male:people.gender,
			birthDay:people.birth_year,
			eyeColor:people.eye_color,
		}
	}
}

// const sw = new SwapiService();
// sw.getPlanet(1)
// 	.then((b) => {
// 		console.log(b);

// 	})
import fetch from 'node-fetch';

const baseURI:string = 'https://swapi.co/api/';

const fetchData = (url:string) : any => {
  fetch(url)
    .then(resp => resp.json())
    .then(json => console.log(json));
}

export const getPeople = (id: number) : any => fetchData (`${baseURI}people/${id}/`);
export const getFilm = (id: number) : any =>  fetchData(`${baseURI}films/${id}/`);
export const getShip = (id: number) : any => fetchData(`${baseURI}starships/${id}/`);
export const getPlanet = (id: number) : any => fetchData(`${baseURI}planets/${id}/`);



import fetch from 'node-fetch';

const baseURI:string = 'https://swapi.co/api/';
const getApiUri = (type: string, id: number) => `${baseURI}${type}/${id}/`;
const fetchApiData = (url:string) : any => {
  fetch(url)
    .then(resp => resp.json())
    .then(json => console.log(json));
}

export const getPeople = (id: number) : any => fetchApiData(getApiUri('people', id));
export const getFilm = (id: number) : any =>  fetchApiData(getApiUri('films', id));
export const getShip = (id: number) : any => fetchApiData(getApiUri('starships', id));
export const getPlanet = (id: number) : any => fetchApiData(getApiUri('planets', id));

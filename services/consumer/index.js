//'use strict';

const axios = require('axios');
const modelPeople = require('../models/peopleModel')
const modelPlanet = require('../models/planetModel')

getPeople = async (number) => {
    try {
        const {data} = await axios({
            methos: 'GET',
            url: `https://swapi.py4e.com/api/people/${number}`
        })
        
        const people = new modelPeople(
            data.name,
            data.height,
            data.mass,
            data.hair_color,
            data.skin_color,
            data.eye_color,
            data.birth_year,
            data.gender,
            data.homeworld,
            data.created,
            data.edited,
            data.url
        )
        console.log(people)
        return people;
    } catch (error) {
        console.log(error)
        return error
    }
}

getPlanet = async (number) => {
    try {
        const {data} = await axios({
            methos: 'GET',
            url: `https://swapi.py4e.com/api/planets/${number}`
        })
        
        const planet = new modelPlanet(
            data.name,
            data.rotation_period,
            data.orbital_period,
            data.diameter,
            data.climate,
            data.gravity,
            data.terrain,
            data.surface_water,
            data.population,
            data.residents,
            data.films,
            data.created,
            data.edited,
            data.url
        )
        console.log(planet)
        return planet;
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = {
    getPeople,
    getPlanet
}

import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => axios.get(`${baseUrl}/all`).then(request => request.data)

const getCountry = (name) => axios.get(`${baseUrl}/name/${name}`).then(request => request.data)

export default { getAll, getCountry }
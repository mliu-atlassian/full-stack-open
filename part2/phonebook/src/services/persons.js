import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then(request => request.data)

const create = newObject => axios.post(baseUrl, newObject).then(request => request.data)

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(request => request.data)

export default { getAll, create, update }

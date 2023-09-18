import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl).then(request => request.data)

const create = newObject => axios.post(baseUrl, newObject).then(request => request.data)

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(request => request.data)

const remove = (id) => axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, update, remove }

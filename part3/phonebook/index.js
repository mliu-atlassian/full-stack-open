const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>
  `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (person) return response.json(person)
  return response.status(404).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'The name or number is missing' })
  }
  if (persons.find(p => p.name === body.name)) {
    return response.status(400).json({ error: 'The name already exists in the phonebook' })
  }
  const person = { ...request.body, id: Math.floor(Math.random() * 2 ** 10) }
  persons = persons.concat(person)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
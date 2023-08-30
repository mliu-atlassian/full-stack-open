import { useState } from 'react'

const Filter = ({ filter, handleFilterChange }) =>
  <div>filter shown with <input onChange={handleFilterChange} value={filter}></input></div>

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) =>
  <form>
    <div>name: <input onChange={handleNameChange} value={newName} /></div>
    <div>number: <input onChange={handleNumberChange} value={newNumber} /></div>
    <div><button type="submit" onClick={addPerson}>add</button></div>
  </form>

const Persons = ({ persons, filter }) =>
  (filter ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons)
    .map(person => <Person key={person.name} person={person} />)

const Person = ({person}) => <div>{person.name} {person.number}</div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App

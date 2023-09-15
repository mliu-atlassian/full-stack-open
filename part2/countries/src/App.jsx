import { useEffect, useState } from 'react'
import countryService from './services/countries'

const Countries = ({ search, countries }) => {
  if (search) {
    const results = countries.map(country => country.name.common).sort().filter(name => name.toLowerCase().includes(search.toLowerCase()))
    if (results.length > 10) return <div>Too many matches, specify another filter</div>
    if (results.length === 1) return <Country country={countries.find(country => country.name.common === results[0])} />
    return results.map(name => <div key={name}>{name}</div>)
  }
}

const Country = ({ country }) => {
  return <>
    <h1>{country.name.common}</h1>
    <div>capital {country.capital[0]}</div>
    <div>area {country.area}</div>
    <h3>languages: </h3>
    <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
    <img src={country.flags.png} />
  </>
}

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => { countryService.getAll().then(initialCountries => setCountries(initialCountries)) }, [])

  const handleSearchChange = event => setSearch(event.target.value)

  return (
    <>
      <div>find countries <input onChange={handleSearchChange} value={search} /></div>
      <Countries search={search} countries={countries} />
    </>
  )
}

export default App

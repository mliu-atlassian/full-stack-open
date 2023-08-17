import { useState } from "react"

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const score = good * 1 + neutral * 0 + bad * -1
  const average = score / all
  const positive = good / all * 100

  if (all === 0) return (
    <>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </>
  )
  return (
    <>
      <h1>statistics</h1>
      <StatisticsLine text='good' value={good} />
      <StatisticsLine text='neutral' value={neutral} />
      <StatisticsLine text='bad' value={bad} />
      <StatisticsLine text='all' value={all} />
      <StatisticsLine text='average' value={average} />
      <StatisticsLine text='positive' value={positive + '%'} />
    </>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  )
}

export default App

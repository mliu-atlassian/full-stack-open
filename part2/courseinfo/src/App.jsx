const Header = ({ text }) => <h1>{text}</h1>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </>

const Total = ({ parts }) => {
  const total = parts.map(part => part.exercises).reduce((sum, val) => sum + val)
  return <b>
    total of {total} exercises
  </b>
}

const Course = ({ course }) =>
  <>
    <Header text={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App

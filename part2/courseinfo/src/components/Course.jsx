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

export default Course
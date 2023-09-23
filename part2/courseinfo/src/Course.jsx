// Header Component: Displays the course name
const Header = ({ course }) => <h2>{course.name}</h2>;

// Total Component: Calculates and displays the total number of exercises
const Total = ({ parts }) => {
  let sum = 0;
  // Calculate the sum of exercises using the reduce method
  sum = parts.reduce((a, b) => a + b.exercises, 0);
  return <b>Total of {sum} exercises</b>;
};

// Part Component: Displays the name and number of exercises for a single part
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

// Content Component: Maps and renders a list of Part components
const Content = ({ parts }) =>
  parts.map((part) => <Part key={part.id} part={part} />);

// Course Component: The main component that combines Header, Content, and Total
const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);

// Export the Course component as the default export
export default Course;

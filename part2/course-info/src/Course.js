const Header = ({ course }) => <h2>{course}</h2>



const Total = ({ parts }) => {
    const total = parts.reduce(
        (s, p) => {
            return s + p.exercises
        },
        0
    )

    return <h3>total of {total} exercises</h3>
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {
        parts.map((part) => {
                return(
                    <Part key={part.id} part={part} />
                )
            }
        )   
    } 
  </>

const Course = ({courses}) => {

    return(
        <div>
            <h1>Web development curriculum</h1>
            {
                courses.map((course) => {
                        return(
                            <div key={course.id}>
                                <Header course={course.name}/>
                                <Content parts={course.parts}/>
                                <Total parts={course.parts}/>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

export default Course
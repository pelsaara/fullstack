import React from 'react'
import Person from './Person'

const Content = (props) => {
    return (
        <div>
            <h2>Numerot</h2>
            <table><tbody>
                {props.persons.map(person => <Person key={person.name} person={person} />)}
            </tbody></table>
        </div>
    )
}

export default Content
import React from 'react'
import Person from './Person'

const PersonList = (props) => {
    return (
        <div>
            <h2>Numerot</h2>
            <table><tbody>
                {props.persons.map(person =>
                    <Person key={person.name}
                        person={person}
                        deletePerson={() => props.deletePerson(person.id)}
                    />
                )}
            </tbody></table>
        </div>
    )
}

export default PersonList
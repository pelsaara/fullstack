import React from 'react'

const Person = (props) => {
        return (
               
                <tr><td>{props.person.name}</td><td>{props.person.number}</td></tr>
        )
    
}

export default Person
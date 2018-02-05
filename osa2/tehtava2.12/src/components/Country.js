import React from 'react'

const Country = (props) => {
        if (props.onlyOne) {
                return (
                        <div>
                        <h2>{props.country.name} {props.country.nativeName}</h2>
                        <p> Capital: {props.country.capital}</p>
                        <p> Population: {props.country.population}</p>
                        <img width='200' height='100' src={props.country.flag} alt='flag'/>
                        </div>

                )
        }
        return (
                <p>{props.country.name}</p>
        )

}

export default Country
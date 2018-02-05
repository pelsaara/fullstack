import React from 'react'
import Country from './Country'

const CountryList = (props) => {
    return (
        <div>
            {props.countries.map(country =>
                <div key={country.name} onClick={() => props.handleSelected(country)}>
                    <Country country={country} />
                </div>
            )}
        </div>
    )
}

export default CountryList
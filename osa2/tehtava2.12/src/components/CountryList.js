import React from 'react'
import Country from './Country'

const CountryList = (props) => {
    return (
        <div>
            <table><tbody>
                {props.countries.map(country => <Country key={country.name} country={country} />)}
            </tbody></table>
        </div>
    )
}

export default CountryList
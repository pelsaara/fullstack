import React from 'react'
import axios from 'axios'
import CountryList from './components/CountryList';
import Country from './components/Country'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      countries: [],
      selectedCountry: false
    }
  }

  handleFilterChange = (event) => {
    console.log(event.target.value)
    this.setState({ 
      filter: event.target.value,
      selectedCountry: false
     })
  }

  handleSelectedCountry = (selectedCountry) => {
    console.log(selectedCountry)
    this.setState({ selectedCountry})
  }

  componentWillMount() {
    console.log('will mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
  }

  render() {

    const countriesToShow =
      this.state.countries
        .filter(country => country.name.toLowerCase()
          .includes(this.state.filter.toLowerCase()))

    let country 
    if (this.state.selectedCountry) {
      country = this.state.selectedCountry
    } else {
      country =  countriesToShow[0]
    }

    let showCountries
    if (countriesToShow.length === 1 || this.state.selectedCountry !== false) {
      showCountries = <Country country={country} onlyOne={true} />
    } else if (countriesToShow.length <= 10) {
      showCountries = <CountryList countries={countriesToShow} handleSelected={this.handleSelectedCountry} />
    } else {
      showCountries = 'Too many matches, please type more characters'
    }

    return (
      <div>
        <div>
          Find countries: &emsp;
            <input
            value={this.state.filter}
            onChange={this.handleFilterChange}
          />
        </div>
        <div>
          {showCountries}
        </div>
      </div>
    )
  }
}

export default App

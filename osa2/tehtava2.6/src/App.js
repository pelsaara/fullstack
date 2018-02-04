import React from 'react'
import PersonList from './components/PersonList'
import personService from './services/persons'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }

    addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }
        if (!this.state.persons.find(person => person.name.toLowerCase() === this.state.newName.toLowerCase())) {

            personService
            .create(personObject)
            .then(newPerson => {
              this.setState({
                persons: this.state.persons.concat(newPerson),
                newName: '',
                newNumber: ''
              })
            })
            
        }

    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })        
    }

    componentWillMount() {
        console.log('will mount')
        personService
        .getAll()
        .then(response => {
          this.setState({ persons: response })
        })
      }


    render() {
        const personsToShow =
        this.state.filter==='' ?
          this.state.persons :
          this.state.persons.filter(person => person.name.toLowerCase().startsWith(this.state.filter.toLowerCase()))
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <div>
                    Rajaa näytettäviä:
                    <input
                        value={this.state.filter}
                        onChange={this.handleFilterChange}
                    />
                </div>
                <h2>Lisää uusi</h2>
                <form onSubmit={this.addPerson}>
                    <div>
                        nimi:&emsp;
                        <input
                            value={this.state.newName}
                            onChange={this.handleNameChange}
                        />
                    </div>
                    <div>
                        numero: &emsp;
                    <input
                            value={this.state.newNumber}
                            onChange={this.handleNumberChange}
                        />
                    </div>
                    <button type="submit">lisää</button>
                </form>
                <PersonList persons={personsToShow} />
            </div>
        )
    }
}



export default App



import React from 'react'
import PersonList from './components/PersonList'
import axios from 'axios'

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
        const PersonObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }
        if (!this.state.persons.find(person => person.name.toLowerCase() === this.state.newName.toLowerCase())) {

            const persons = this.state.persons.concat(PersonObject)

            this.setState({
                persons: persons,
                newName: '',
                newNumber: ''
            })
        }

    }

    handleNameChange = (event) => {
        console.log(event.target.value)
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        console.log(event.target.value)
        this.setState({ newNumber: event.target.value })
    }

    handleFilterChange = (event) => {
        console.log(event.target.value)
        this.setState({ filter: event.target.value })        
    }

    componentWillMount() {
        console.log('will mount')
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            console.log('promise fulfilled')
            this.setState({ persons: response.data })
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



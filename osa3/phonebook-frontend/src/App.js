import React from 'react'
import PersonList from './components/PersonList'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            message: null
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

            this.setState({
                message: `${personObject.name} lisätty onnistuneesti`
            })
            setTimeout(() => {
                this.setState({ message: null })
            }, 5000)


        } else {
            if (window.confirm(`${personObject.name} on jo luettelossa, korvataanko numero uudella?`)) {
                const person = this.state.persons.find(p => p.name.toLowerCase() === personObject.name.toLowerCase())
                const updatedPerson = {
                    ...person,
                    number: personObject.number
                }
                personService
                    .update(updatedPerson.id, updatedPerson)
                    .then(uPerson =>
                        this.setState({
                            persons: this.state.persons.map(person => person.id !== updatedPerson.id ? person : uPerson),
                            newName: '',
                            newNumber: '',
                            message: `Henkilön ${updatedPerson.name} tiedot päivitetty onnistuneesti`
                        })
                    ).then(
                    setTimeout(() => {
                        this.setState({ message: null })
                    }, 5000)
                    ).catch(error => {
                        alert(`Henkilö '${personObject.name}' on jo valitettavasti poistettu palvelimelta`)
                        this.setState({ persons: this.state.persons.filter(p => p.name.toLowerCase() !== personObject.name.toLowerCase()) })                    })

            }
        }

    }

    componentWillMount() {
        personService
            .getAll()
            .then(response => {
                this.setState({ persons: response })
            })
    }

    deletePerson = (id) => {
        let dPerson = this.state.persons.find(p => p.id === id)
        if (window.confirm(`Haluatko varmasti poistaa henkilön ${dPerson.name}`)) {
            personService.deleteP(id).then(() => {
                this.setState({
                    persons: this.state.persons.filter(person => person.id !== id),
                    message: `Henkilön ${dPerson.name} tiedot poistettu onnistuneesti`
                })
                setTimeout(() => {
                    this.setState({ message: null })
                }, 5000)
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


    render() {
        const personsToShow =
            this.state.filter === '' ?
                this.state.persons :
                this.state.persons.filter(person => person.name.toLowerCase().startsWith(this.state.filter.toLowerCase()))
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Notification message={this.state.message} />
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
                <PersonList persons={personsToShow} deletePerson={this.deletePerson} />
            </div>
        )
    }
}



export default App



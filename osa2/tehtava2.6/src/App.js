import React from 'react'
import Content from './components/Content'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas', number: '040-123456' },
                { name: 'Martti Tienari', number: '040-123456' },
                { name: 'Arto Järvinen', number: '040-123456' },
                { name: 'Lea Kutvonen', number: '040-123456' }
            ],
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
        if (!this.state.persons.find(person => person.name.toLowerCase() === this.state.newName.toLowerCase())            ) {

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



    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
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
                <Content persons={this.state.persons} />
            </div>
        )
    }
}



export default App



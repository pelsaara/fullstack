import React from 'react';
import Person from './components/Person'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas' }
            ],
            newName: ''
        }
    }

    addName = (event) => {
        event.preventDefault()
        const nameObject = {
            name: this.state.newName
        }
        if (!this.state.persons.find(person => person.name.toLowerCase() === this.state.newName.toLowerCase())){
            const persons = this.state.persons.concat(nameObject)

            this.setState({
                persons: persons,
                newName: ''
            })
        } 

    }

    handleNameChange = (event) => {
        console.log(event.target.value)
        this.setState({ newName: event.target.value })
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addName}>
                    <div>
                        nimi:
                        <input
                            value={this.state.newName}
                            onChange={this.handleNameChange}
                        />
                    </div>
                    <div>
                    </div>
                    <button type="submit">lisää</button>
                </form>
                <h2>Numerot</h2>
                <div>
                    {this.state.persons.map(person => <Person key={person.name} person={person} />)}
                </div>
            </div>
        )
    }
}



export default App



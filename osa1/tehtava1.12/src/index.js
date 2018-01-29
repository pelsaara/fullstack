import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: [0, 0, 0, 0, 0, 0]
        }
    }

    randomAnecdote = () => () => {
        this.setState({ selected: Math.floor(Math.random() * (this.props.anecdotes.length)) })
    }

    addVote = () => () => {
        const kopio = [...this.state.votes]
        kopio[this.state.selected] += 1
        this.setState({ votes: kopio })
    }

    mostVotes = () => {
        const kopio = [...this.state.votes]
        let max = kopio[0];
        let maxIndex = 0;

        for (let i = 1; i < kopio.length; i++) {
            if (kopio[i] > max) {
                maxIndex = i;
                max = kopio[i];
            }
        }
        return maxIndex
    }

    render() {
        return (
            <div>
                <div>
                    <p>
                        {this.props.anecdotes[this.state.selected]}
                    </p>
                    <p>
                        This anecdote has {this.state.votes[this.state.selected]} votes
                    </p>
                    <tr>
                        <td>
                            <Button
                                handleClick={this.randomAnecdote()}
                                text="Next Anecdote"
                            />
                        </td> <td>
                            <Button
                                handleClick={this.addVote()}
                                text="Vote"
                            />
                        </td>
                    </tr>
                </div>
                <div>
                    <h3> Anecdote with most votes</h3>
                    <p>
                        {this.props.anecdotes[this.mostVotes()]}
                    </p>
                    <p>
                        This anecdote has {this.state.votes[this.mostVotes()]} votes
                    </p>
                </div>
            </div>
        )
    }
}

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}


const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)

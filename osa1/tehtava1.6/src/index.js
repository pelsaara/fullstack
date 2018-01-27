import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            keskiarvo: 0,
            positiiviset: 0.0,
            kaikki: []
        }
    }

    klikkiKuuntelija = (nappi) => () => {
        if (nappi === 'hyva') {
            this.setState({
                hyva: this.state.hyva + 1,
                kaikki: this.state.kaikki.concat(1)
            })
        }

        if (nappi === 'neutraali') {
            this.setState({
                neutraali: this.state.neutraali + 1,
                kaikki: this.state.kaikki.concat(0)
            })
        }

        if (nappi === 'huono') {
            this.setState({
                huono: this.state.huono + 1,
                kaikki: this.state.kaikki.concat(-1)
            })
        }
        this.keskiArvo()
        this.positiivisia()
    }

    keskiArvo = () => {
        if (this.state.kaikki.length > 0) {
            let summa = 0
            for (let i = 0; i < this.state.kaikki.length; i++) {
                summa += this.state.kaikki[i]
            }

            this.setState({
                keskiarvo: (summa / (this.state.kaikki.length))
            })
        }
    }

    positiivisia = () => {
        if (this.state.kaikki.length > 0) {
            this.setState({
                positiiviset: (this.state.hyva / (this.state.kaikki.length) * 100)
            })
        }
    }

    render() {
        return (
            <div>
                <h1>Anna palautetta</h1>
                <div>
                    <table><tbody>
                        <tr>
                            <td>
                                <Button
                                    handleClick={this.klikkiKuuntelija('hyva')}
                                    text="Hyvä"
                                />
                            </td><td>
                                <Button
                                    handleClick={this.klikkiKuuntelija('neutraali')}
                                    text="Neutraali"
                                />
                            </td><td>
                                <Button
                                    handleClick={this.klikkiKuuntelija('huono')}
                                    text="Huono"
                                />
                            </td>
                        </tr>
                    </tbody></table>
                </div>
                <div>
                    <Statistics
                        tila={this.state}
                    />
                </div>
            </div>
        )
    }
}

const Statistics = ({ tila }) => {
    if (tila.kaikki.length === 0) {
        return (
            <p>Yhtään palautetta ei ole annettu</p>
        )
    }

    return (
        <div>
            <h2>Statistiikka</h2>
            <table><tbody>
            <Statistic
                teksti="Hyvä: "
                tila={tila.hyva}
            />
            <Statistic
                teksti="Neutraali: "
                tila={tila.neutraali}
            />
            <Statistic
                teksti="Huono: "
                tila={tila.huono}
            />
            <Statistic
                teksti="Keskiarvo: "
                tila={tila.keskiarvo}
            />
            <Statistic
                teksti="Positiivisia: "
                tila={tila.positiiviset}
            />
            </tbody></table>
        </div>
    )
}

const Statistic = ({ teksti, tila }) => {
    return (
        <tr><td>{teksti}</td><td>{tila}</td></tr>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
)
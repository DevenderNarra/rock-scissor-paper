import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    playerChoice: '',
    opponentChoice: '',
    resultMessage: '',
    score: 0,
    showResults: false,
    showRules: false,
  }

  handleShowRules = () => {
    this.setState({showRules: true})
  }

  closeRules = () => {
    this.setState({showRules: false})
  }

  getRandomChoice = () => {
    const randomIndex = Math.floor(Math.random() * choicesList.length)
    return choicesList[randomIndex]
  }

  playGame = choiceId => {
    const playerChoice = choiceId
    const opponentChoice = this.getRandomChoice().id
    let resultMessage = ''

    // Determine the game result
    if (playerChoice === opponentChoice) {
      resultMessage = 'IT IS DRAW'
    } else if (
      (playerChoice === 'ROCK' && opponentChoice === 'SCISSORS') ||
      (playerChoice === 'SCISSORS' && opponentChoice === 'PAPER') ||
      (playerChoice === 'PAPER' && opponentChoice === 'ROCK')
    ) {
      resultMessage = 'YOU WON'
      this.setState(prevState => ({score: prevState.score + 1}))
    } else {
      resultMessage = 'YOU LOSE'
      this.setState(prevState => ({score: prevState.score - 1}))
    }

    this.setState({
      playerChoice,
      opponentChoice,
      resultMessage,
      showResults: true,
    })
  }

  playAgain = () => {
    this.setState({
      playerChoice: '',
      opponentChoice: '',
      resultMessage: '',
      showResults: false,
    })
  }

  render() {
    const {
      score,
      playerChoice,
      opponentChoice,
      resultMessage,
      showResults,
      showRules,
    } = this.state

    return (
      <div className="app-container">
        <h1>Rock Paper Scissors</h1>
        <p>Score</p>
        <p style={{fontFamily: 'Roboto'}}>{score}</p>
        {!showResults ? (
          <>
            <div className="button-container">
              <button
                type="button"
                data-testid="rockButton"
                onClick={() => this.playGame('ROCK')}
              >
                <img src={choicesList[0].imageUrl} alt="Rock" />
              </button>
              <button
                type="button"
                data-testid="scissorsButton"
                onClick={() => this.playGame('SCISSORS')}
              >
                <img src={choicesList[1].imageUrl} alt="Scissors" />
              </button>
              <button
                type="button"
                data-testid="paperButton"
                onClick={() => this.playGame('PAPER')}
              >
                <img src={choicesList[2].imageUrl} alt="Paper" />
              </button>
            </div>

            <button type="button" onClick={this.handleShowRules}>
              Rules
            </button>

            <Popup open={showRules} onClose={this.closeRules}>
              <div className="popup-content">
                <button type="button" onClick={this.closeRules}>
                  <RiCloseLine />
                </button>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
              </div>
            </Popup>
          </>
        ) : (
          <div className="results">
            <p>{resultMessage}</p>
            <div className="choices">
              <div className="choice">
                <h3>YOU</h3>
                <img
                  src={
                    choicesList.find(choice => choice.id === playerChoice)
                      ?.imageUrl
                  }
                  alt="Your choice"
                />
              </div>
              <div className="choice">
                <h3>OPPONENT</h3>
                <img
                  src={
                    choicesList.find(choice => choice.id === opponentChoice)
                      ?.imageUrl
                  }
                  alt="opponent choice"
                />
              </div>
            </div>
            <button type="button" onClick={this.playAgain}>
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default App

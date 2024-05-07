import { useState, useEffect, createContext } from 'react'
import { decode } from 'he'
import './App.css'
import QuizPage from './components/QuizPage'
import { nanoid } from 'nanoid'
import QuizParams from './components/QuizParams'

const IntroContext = createContext()

function App() {
  const [begun, setBegun] = useState(false) //state for whether the game has begun
  const [triviaSet, setTriviaSet] = useState([])



  const [params, setParams] = useState({
    number: 10,
    category: 9,
    difficulty: ''
  })

  function handleParamsChange(e) {
    setParams({
      ...params,
      [e.target.name]: e.target.value
    })
  }


  async function getTrivia() {
    const fetchURL = `https://opentdb.com/api.php?amount=${params.number}&category=${params.category}${params.difficulty !== '' ? `&difficulty=${params.difficulty}` : ''}&type=multiple`
    const res = await fetch(fetchURL)
    const data = await res.json()

    const trivia = data.results.map(question => {
      const { correct_answer, incorrect_answers } = question
      return {
        correct: decode(correct_answer),
        options: incorrect_answers.map(answer => decode(answer)),
        questionText: decode(question.question),
        id: nanoid()
      }
    })
    setTriviaSet(trivia)
    setBegun(true)
  }

  function restartGame() {
    setBegun(false)
  }


  console.log(triviaSet)
  console.log(params)

  return (

    <div className='app--canvas'>
      {!begun ?
        <IntroContext.Provider value={{ params, handleParamsChange, getTrivia }}>
          <div className="intro-page">
            <h1 >Quizzical</h1>
            <h3 >Some description if needed</h3>

            <QuizParams />

          </div>
        </IntroContext.Provider>
        :
        <QuizPage
          triviaSet={triviaSet}
          restartGame={restartGame}
        />
      }
    </div >


  )
}

export default App

export { IntroContext }
import React from 'react'
import Question from './Question'
import Options from './Options'

const QuestionContext = React.createContext()


const QuizPage = ({ triviaSet, begun, restartGame }) => {
    const answers = []
    const [showAnswers, setShowAnswers] = React.useState(false)
    const [numberRight, setNumberRight] = React.useState(0)

    function updateAnswer(ans, i) {
        answers[i] = ans
        console.log(answers)

    }


    const questionsUI = triviaSet.map((item, index) => {
        const allChoices = [...item.options] //had to spread 'options' in otherwise allChoices was being equated to 'options'
        allChoices.splice((allChoices.length + 1) * Math.random() | 0, 0, item.correct) //inserts correct answer at random index
        return (
            <Question
                key={item.id}
                question={item}
            >
                <Options
                    allChoices={allChoices}
                    number={index}
                    correct={item.correct}
                    id={item.id}
                />
            </Question>

        )
    })

    function checkAnswers(answers) {

        if (answers.every(ans => ans !== null)) {
            setShowAnswers(true)
            getNumberRight(answers)
        } else {
            alert('Please fill out all questions before checking answers')
            console.log('one of these is not filled out') //implement feature where it highlights missing question
        }

    }

    function getNumberRight(answers) {
        let rightOnes = 0
        const rightAnswers = triviaSet.map(q => q.correct)
        rightAnswers.forEach((rAnswer, index) => {
            if (rAnswer === answers[index]) {
                rightOnes += 1
            }

        });
        setNumberRight(rightOnes) //why did I need to store this in state?  Why did returning a number from a function not work?
    }



    return (
        <QuestionContext.Provider value={{ updateAnswer, showAnswers, answers, restartGame }}>
            <div className="quiz-container">
                <form action="">
                    <div className='quiz-questions'>
                        {questionsUI}
                    </div>
                    <div className='quiz-buttons'>
                        {!showAnswers ?
                            <button
                                type="button"
                                className="quiz-button"
                                onClick={() => checkAnswers(answers)}>Check Answers
                            </button> :
                            <div className='lower-button-container'>
                                <p>You got {numberRight}/{triviaSet.length} correct!</p>
                                <button type="button"
                                    className="quiz-button"
                                    onClick={restartGame}
                                >Play Again
                                </button>
                            </div>}
                    </div>


                </form>


            </div >
        </QuestionContext.Provider>

    )
}

export default QuizPage
export { QuestionContext }


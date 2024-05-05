import React from 'react'
import Options from './Options'
import Option from './Option'

// const Question = ({ allChoices, question, number, updateAnswer, showAnswers }) => {
const Question = (props) => {


    return (
        <div className={"question--container"}>
            <p className="question">{props.question.questionText}</p>
            <div className="choices">

                <Options
                    // allChoices={allChoices}
                    number={props.number}
                    correct={props.question.correct}
                    id={props.question.id}
                // updateAnswer={updateAnswer}
                // showAnswers={showAnswers}
                />
            </div>
            <hr />
        </div>

    )
}

export default Question
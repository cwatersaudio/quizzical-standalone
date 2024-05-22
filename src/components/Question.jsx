import React from 'react'
import Options from './Options'
import Option from './Option'

const Question = ({ question, children }) => {



    return (
        <div className={"question--container"}>
            <p className="question">{question.questionText}</p>
            <div className="choices">

                {children}
            </div>
            <hr />
        </div>

    )
}

export default Question
import React from 'react'

const Options = ({ options, number, correct }) => {
    const allChoices = [...options] //had to spread 'options' in otherwise allChoices was being equated to 'options'
    allChoices.splice((allChoices.length + 1) * Math.random() | 0, 0, correct) //inserts correct answer at random index
    console.log(allChoices)
    return (
        <div className='answer-choices'>
            {allChoices.map((option, index) => {
                return (
                    <>
                        <input type="radio" id={`choices${number},${index}`} name={`choices${number}`} value={option} />
                        <label htmlFor={`choices${number},${index}`}>{option}</label>
                    </>
                )
            })}

        </div>
    )
}

export default Options
import React from 'react'

const Options = ({ allChoices, number, correct, updateAnswer, showAnswers }) => {
    const [selected, setSelected] = React.useState(null)

    function handleSelect(event, i) {
        console.log(event.target)
        setSelected(event.target.value)

    }
    React.useEffect(() => {
        updateAnswer(selected, number)
    }, [selected])

    return (

        <div className='answer-choices'>
            {allChoices.map((option, index) => {
                let styles

                return (
                    <>
                        <input
                            type="radio"
                            id={`choices${number},${index}`}
                            name={`choices${number}`}
                            value={option}
                            onChange={() => handleSelect(event, number)}

                        />
                        <label
                            htmlFor={`choices${number},${index}`}
                            className={`option ${option === selected ? "selected" : ""}`}
                        >{option}</label >
                    </>
                )
            })}

        </div >
    )
}

export default Options
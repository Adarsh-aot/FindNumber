import React, { useState } from 'react';

function FindNumber() {
    const [value, setValue] = useState('');
    const [randomvalue , setRandomValue] = useState(Math.floor(Math.random() * 100));
    const [message , setMessage] = useState('');
    const [round , setRound] = useState(0);
    const [check , setCheck] = useState(true); // Use boolean to control display

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(randomvalue)
        setRound(round + 1);
        checkValue();
    };

    const checkValue = () => {
        if (parseInt(value) === randomvalue) {
            setMessage(`Number Found in ${round} rounds`);   
            setCheck(false); // Hide the button
        } else {
            if (parseInt(value) > randomvalue) {
                setMessage('Too High');
            } else {
                setMessage('Too Low');
            }
        }
    };

    const handleInputChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <>
            <h1>FindNumber</h1>
            <p>{message}</p>
            <input type="number" onChange={handleInputChange} value={value} />
            <button onClick={handleSubmit} style={{ display: check ? 'block' : 'none' }}>Submit</button>
            {/* Display current value for testing */}
            {value}
        </>
    );
}

export default FindNumber;
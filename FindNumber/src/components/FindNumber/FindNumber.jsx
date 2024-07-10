import React, { useState } from 'react';
import './FindNumber.css';

function FindNumber() {
    const [value, setValue] = useState('');
    const [randomValue, setRandomValue] = useState(Math.floor(Math.random() * 100));
    const [message, setMessage] = useState('');
    const [round, setRound] = useState(0);
    const [check, setCheck] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(randomValue);
        setRound(round + 1);
        checkValue();
    };

    const checkValue = () => {
        if (parseInt(value) === randomValue) {
            setMessage(`Number Found in ${round} rounds`);
            setCheck(false);
        } else {
            if (parseInt(value) > randomValue) {
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
        <div className="app-container">
            <div className="card">
                <h1 className="title">Find the Number</h1>
                <p className={`message ${!check ? 'found' : ''}`}>{message}</p>
                <input
                    type="number"
                    onChange={handleInputChange}
                    value={value}
                    placeholder="Enter your guess"
                    className="input"
                />
                {check && <button onClick={handleSubmit} className="button">Submit</button>}
            </div>
        </div>
    );
}

export default FindNumber;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FindNumber.module.css';
import axios from 'axios';
import BASE_URL from '../Staic/url';

function FindNumber() {
    const [value, setValue] = useState('');
    const [randomValue, setRandomValue] = useState(Math.floor(Math.random() * 100));
    const [message, setMessage] = useState('');
    const [round, setRound] = useState(0);
    const [check, setCheck] = useState(true);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/');
        }
    }, []);

    useEffect(() => {
        axios.get(`${BASE_URL}/detail`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        }).then(res =>{
            const sorteddata = res.data.sort((a, b) => a.detail - b.detail);
            setData(sorteddata);
        })
        .catch(err => console.log(err));
    }, []);

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
            axios.post(`${BASE_URL}/detail/adddata`, {detail: round}, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
            
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
        <div className={styles.appContainer}>
            <div className={styles.card}>
                <button className={styles.logoutButton} onClick={() => {localStorage.clear(); navigate('/');}}>LOGOUT</button>
                <h1 className={styles.title}>Find the Number</h1>
                <p className={`${styles.message} ${!check ? styles.found : ''}`}>{message}</p>
                <input
                    type="number"
                    onChange={handleInputChange}
                    value={value}
                    placeholder="Enter your guess"
                    className={styles.input}
                />
                {check && <button onClick={handleSubmit} className={styles.button}>Submit</button>}
                {!check && <button onClick={() => setCheck(window.location.reload())} className={styles.button}>Play Again</button>}
            </div>

            <div className={styles.card}>
                <h1 className={styles.title}>LeaderBoard</h1>
                <div className={styles.leaderboard}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Number of rounds</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.detail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default FindNumber;
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });

            const token = res.data.token;
            login(token); // saugom į context ir localStorage
            navigate('/notes'); // redirect

        } catch (err) {
            setError('Prisijungimo klaida. Patikrink duomenis.');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="mb-4 text-center">Prisijungimas</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Vartotojo vardas</label>
                    <input
                        id="username"
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Slaptažodis</label>
                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>

                <button type="submit" className="btn btn-primary w-100">Prisijungti</button>
            </form>
        </div>
    );
}

export default LoginPage;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
      });
      setSuccess(true);
      navigate('/login'); // redirect to login page after successful registration
    } catch (err) {
      setError('Registracija nepavyko.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registracija</h2>
      <form onSubmit={handleRegister} className="mt-4">
        {success && <div className="alert alert-success">Registracija sėkminga! Galite prisijungti.</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Vartotojo vardas</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required />
        </div>
        <div className="mb-3">
          <label className="form-label">Slaptažodis</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
        <button type="submit" className="btn btn-success">Registruotis</button>
      </form>
    </div>
  );
}

export default RegisterPage;

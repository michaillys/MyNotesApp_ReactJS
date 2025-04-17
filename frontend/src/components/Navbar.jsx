import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <Link className="navbar-brand" to="/">MyNotesApp</Link>

            <div className="collapse navbar-collapse show">
                <ul className="navbar-nav me-auto">
                    {isLoggedIn && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/notes">Užrašai</Link>
                        </li>
                    )}
                </ul>

                <ul className="navbar-nav ms-auto">
                    {!isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Prisijungti</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Registruotis</Link>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                                Atsijungti
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;

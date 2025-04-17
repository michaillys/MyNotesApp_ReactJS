import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="container mt-5 text-center">
            <h1 className="mb-4">Sveiki atvykę</h1>
            <p className="lead">Tvarkykite savo užrašus paprastai ir saugiai.</p>

            <div className="d-flex justify-content-center mt-4 gap-3">
                <Link to="/login" className="btn btn-primary btn-lg">Prisijungti</Link>
                <Link to="/register" className="btn btn-outline-success btn-lg">Registruotis</Link>
            </div>
        </div>
    );
}

export default HomePage;

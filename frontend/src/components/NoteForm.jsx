import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function NoteForm({ onNoteCreated }) {
    const { token } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('kita');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/notes', {
                title,
                content,
                category
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            onNoteCreated(); // reload notes
            setTitle('');
            setContent('');
            setCategory('kita');
        } catch (err) {
            console.error('Nepavyko sukurti užrašo', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
                <label className="form-label">Pavadinimas</label>
                <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required />
            </div>
            <div className="mb-3">
                <label className="form-label">Turinys</label>
                <textarea
                    className="form-control"
                    rows="3"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required />
            </div>
            <div className="mb-3">
                <label className="form-label">Kategorija</label>
                <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value="asmeninė">Asmeninė</option>
                    <option value="darbas">Darbas</option>
                    <option value="mokslai">Mokslai</option>
                    <option value="kita">Kita</option>
                </select>
            </div>
            <button type="submit" className="btn btn-success">Sukurti užrašą</button>
        </form>
    );
}

export default NoteForm;

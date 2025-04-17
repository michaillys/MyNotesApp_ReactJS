import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function NoteEditForm({ note, onCancel, onUpdated }) {
    const { token } = useContext(AuthContext);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [category, setCategory] = useState(note.category);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5000/api/notes/${note.id || note._id}`, {
                title,
                content,
                category,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            onUpdated(); // reload
            onCancel();  // close form
        } catch (err) {
            console.error('Nepavyko atnaujinti užrašo', err);
        }
    };

    return (
        <form onSubmit={handleUpdate} className="mb-4">
            <h4>Redaguoti užrašą</h4>
            <div className="mb-3">
                <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="mb-3">
                <textarea className="form-control" rows="3" value={content} onChange={(e) => setContent(e.target.value)} required />
            </div>
            <div className="mb-3">
                <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="asmeninė">Asmeninė</option>
                    <option value="darbas">Darbas</option>
                    <option value="mokslai">Mokslai</option>
                    <option value="kita">Kita</option>
                </select>
            </div>
            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">Išsaugoti</button>
                <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Atšaukti</button>
            </div>
        </form>
    );
}

export default NoteEditForm;

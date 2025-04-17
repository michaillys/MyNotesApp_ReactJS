import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import NoteEditForm from '../components/NoteEditForm';
import NoteCard from '../components/NoteCard';
import { useMemo } from 'react';

function NotesPage() {
    const { token, isLoggedIn } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const [editingNote, setEditingNote] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState('visos');


    const filteredNotes = useMemo(() => {
        return notes.filter(
            (note) => categoryFilter === 'visos' || note.category === categoryFilter
        );
    }, [notes, categoryFilter]);



    const navigate = useNavigate();

    // FUNKCIJA: Gauti užrašus iš serverio
    const fetchNotes = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/notes', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNotes(res.data);
        } catch (err) {
            console.error('Nepavyko gauti užrašų', err);
        }
    };

    // Tikrinam ar vartotojas prisijungęs, tada užkraunam duomenis
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        fetchNotes();
    }, [isLoggedIn, token, navigate]);

    // TRYNIMAS
    const handleDelete = async (id) => {
        if (!window.confirm('Ar tikrai norite ištrinti šį užrašą?')) return;

        try {
            await axios.delete(`http://localhost:5000/api/notes/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchNotes(); // reload po trynimo
        } catch (err) {
            console.error('Nepavyko ištrinti užrašo', err);
        }
    };

    // REDAGAVIMAS
    const handleEdit = (note) => {
        setEditingNote(note); // atidaro redagavimo formą su note duomenimis
    };

    // KATEGORIJOS FILTRAVIMAS
    const handleFilterChange = (e) => {
        setCategoryFilter(e.target.value);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Tavo užrašai</h2>

            {/* Naujo užrašo forma */}
            <NoteForm onNoteCreated={fetchNotes} />

            {/* Redagavimo forma */}
            {editingNote && (
                <NoteEditForm
                    note={editingNote}
                    onCancel={() => setEditingNote(null)}
                    onUpdated={fetchNotes}
                />
            )}

            {/* Kategorijų filtravimas */}
            <div className="mb-4">
                <label className="form-label">Filtruoti pagal kategoriją:</label>
                <select
                    className="form-select"
                    value={categoryFilter}
                    onChange={handleFilterChange}
                >
                    <option value="visos">Visos</option>
                    <option value="asmeninė">Asmeninė</option>
                    <option value="darbas">Darbas</option>
                    <option value="mokslai">Mokslai</option>
                    <option value="kita">Kita</option>
                </select>
            </div>


            {/* Užrašų sąrašas */}
            {notes.length === 0 ? (
                <p>Užrašų dar nėra.</p>
            ) : (
                <div className="row">
                    {filteredNotes.map((note) => (
                        <NoteCard
                            key={note.id || note._id}
                            note={note}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default NotesPage;

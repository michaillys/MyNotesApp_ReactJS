import React from 'react';

const NoteCard = React.memo(({ note, onEdit, onDelete }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.content}</p>
                    <span className="badge bg-secondary">{note.category}</span>
                </div>
                <div className="card-footer text-end">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(note)}>
                        Redaguoti
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(note.id || note._id)}>
                        Ištrinti
                    </button>
                </div>
            </div>
        </div>
    );
});

export default NoteCard;

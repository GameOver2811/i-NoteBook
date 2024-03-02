import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/notesContext'
import Modal from './Modal';

const ShowNotes = (props) => {
    const noteState = useContext(noteContext);
    const {notes, deleteNote, fetchNotes} = noteState;

    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGIwYWYxN2NiMmNmNmJiNmYzMGVkMyIsImlhdCI6MTcwMzYxMjA3NX0.S9wrtXfbUP25518x3F9tnvNJwmU5tvajcpZcVGeLt2Y"

    const handleDelete = (e, id) => {
        e.preventDefault();
        deleteNote(id);
        // console.log(notes[0].tag);
    };

    useEffect(() => {
        fetchNotes(authToken);
    }, [])

    return (
        <div className='container my-3 my-5'>
            <h2>Notes:</h2>
            <div className='row justify-content-center my-3'>
                {notes.map((note) => {
                    return (
                        <div key={note._id} className='card text-white bg-primary mb-3 mx-3 col-5'>
                            <div className='card-header d-flex justify-content-between align-items-center'>
                                <h6>{note.title}</h6>
                                <div className='icon'>
                                    <i className="fa-solid fa-trash mx-3" onClick={(e) => handleDelete(e, note._id)}></i>
                                </div>
                            </div>
                            <div className='card-body'>
                                <h5 className='card-title'>{note.tag}</h5>
                                <p className='card-text'>{note.description}</p>
                            </div>

                            {/* Modal */}
                            
                        </div>

                    );
                })}
            </div>
        </div>
    )
}

export default ShowNotes

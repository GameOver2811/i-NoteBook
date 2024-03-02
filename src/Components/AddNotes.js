import React from 'react'
import { useState, useContext } from 'react'
import NotesState from '../context/notes/notesContext'


const AddNotes = () => {

    const noteState = useContext(NotesState);
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGIwYWYxN2NiMmNmNmJiNmYzMGVkMyIsImlhdCI6MTcwMzYxMjA3NX0.S9wrtXfbUP25518x3F9tnvNJwmU5tvajcpZcVGeLt2Y"

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleSubmitAdd = (e) => {
        e.preventDefault();
        noteState.addNote(authToken, note)
    }

    return (
        <div className='container my-3'>
            <h2>Add Notes</h2>
            <form className='my-3' id="myForm" onSubmit={handleSubmitAdd}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" name="title" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your notes with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" className="form-control" name="description" id="exampleInputPassword1" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Tags</label>
                    <input type="text" className="form-control" name="tag" id="exampleInputPassword1" onChange={onChange} />
                </div>
                
                <button type="submit" className="btn btn-primary" >Add</button>
            </form>
            
        </div>
    )
}

export default AddNotes

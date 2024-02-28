import { useState } from "react";
import NoteContext from "./notesContext";
import toast from "react-hot-toast";

const NotesState = (props) => {
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGIwYWYxN2NiMmNmNmJiNmYzMGVkMyIsImlhdCI6MTcwMzYxMjA3NX0.S9wrtXfbUP25518x3F9tnvNJwmU5tvajcpZcVGeLt2Y"
  let AllNotes = []
  const [notes, setNotes] = useState(AllNotes);

  // deleteNote
  const deleteNote = async (noteId) => {
    try {
      console.log(noteId);
      const response = await fetch(`http://localhost:5000/api/notes/delete/${noteId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGIwYWYxN2NiMmNmNmJiNmYzMGVkMyIsImlhdCI6MTcwMzc0NjEwNn0.J3x8prBSDjv89wLxP-RNwIzSdIZU4BtU2PVolFHdctE"
        }
      });
      
      fetchNotes(authToken);
      toast.success("Deleted Node Sucessfully!")
      // Add further handling based on the response (e.g., check for success, handle errors)
    } catch (error) {
      // Handle any exceptions or errors during the fetch
      console.error("Error during deleteNote:", error);
      toast.error("Error occured!")
    }
  };
  // AddNote

  const addNote = async (userId, note) => {
    try {
      const response = await fetch("http://localhost:5000/api/notes/addnotes", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGIwYWYxN2NiMmNmNmJiNmYzMGVkMyIsImlhdCI6MTcwMzc0NjEwNn0.J3x8prBSDjv89wLxP-RNwIzSdIZU4BtU2PVolFHdctE"
        },
        body: JSON.stringify({
          "title": note.title,
          "description": note.description,
          "tag": "Personal"
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      fetchNotes(authToken);
      toast.success("Note Added Sucessfully!")

      const responseData = await response.json();
      console.log(responseData);

      // Perform any additional actions here if needed
    } catch (error) {
      console.error("Error during fetch operation:", error);
      toast.error("Error Occured!")
      // Handle the error as needed (e.g., show an error message to the user)
    }
  }


  // FetchNotes 

  const fetchNotes = async (userId) => {
    try {
      const response = await fetch("http://localhost:5000/api/notes/fetchallnotes", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "auth-token": userId,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const resJson = await response.json();
      console.log(resJson);
      setNotes(resJson) // Assuming that the response is an array of notes
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error("Uncaught Error Occured while fetching!");
    }
  };


  return (
    <NoteContext.Provider value={{ notes, deleteNote, addNote,fetchNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NotesState;
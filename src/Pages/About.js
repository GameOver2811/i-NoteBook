import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/notesContext'

const About = (props) => {
  const notesState = useContext(noteContext);
  return (
    <div>
      <h1>About Us</h1>
    </div>
  )
}

export default About

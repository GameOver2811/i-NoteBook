import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/notesContext'

const About = (props) => {
  const notesState = useContext(noteContext);
  return (
    <div>
      <h1>Hii this is {notesState.name} and my age is {notesState.Age} </h1>
    </div>
  )
}

export default About

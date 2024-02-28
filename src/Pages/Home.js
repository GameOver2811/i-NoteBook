import React, { useRef } from 'react'
import Navbar from '../Components/Navbar'
import AddNotes from '../Components/AddNotes'
import ShowNotes from '../Components/ShowNotes'

const home = () => {

  return (
    <div className='container'>
      <AddNotes />
      <ShowNotes/>
    </div>
  )
}

export default home


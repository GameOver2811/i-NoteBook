import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import NotesState from './context/notes/notesState';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <NotesState>
        <Toaster/>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </NotesState>
    </>
  );
}

export default App;

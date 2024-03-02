const express = require('express');
const fetchuser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const user = require('../models/user');


// Route-01 :: Fetchnig all notes --  login required using Path /api/notes/fetchallnotes

router.get('/fetchallnotes', fetchuser, async(req,res)=>{
    
    try {
        const notes =  await Notes.find({user : req.user.id});
        res.json(notes);    
    } catch (error) {
        // console.error("Login Error:", error);
        res.status(500).send("Something went Wrong!");
    }

})

// Route-02 :: Adding Notes notes--  login required using Path /api/notes/addnotes

router.post('/addnotes', fetchuser, [
    body('title','Enter a Valid Title').isLength({min:3}),
    body('description', 'Description must be 8 character long').isLength({min:8}), 
    ],async(req,res)=>{
    
    try {

        const result = validationResult(req);

        

        if (!result.isEmpty()) { 
            res.send({ errors: result.array()});
        }

        const {title,description,tag} = req.body;
        const userId = req.user.id;
        const note = new Notes({ 
            user : userId,
            title : title,
            description : description,
            tag : tag
        })
        const savedNotes = await note.save();

        res.json(savedNotes);   

    } catch (error) {
        
        res.status(500).send("Something went Wrong!");
    }

})



// Route-02 :: Notes deletion  --  login required using Path /api/notes/deletion

router.put('/delete/:id', fetchuser,async(req,res)=>{
    
    try {
        const notesId = req.params.id;
        const userId = req.user.id;

        const note = await Notes.findById(notesId);
        if(!note) {
            return res.status(404).send("Note not found");
        }
        const noteUserId = note.user.toString();

        if(userId !== noteUserId.toString()) {
            return res.status(401).send("Access Denied")
        }

        updatedNotes = await Notes.findByIdAndDelete(notesId);

        return res.send("Deleted...");

    } catch (error) {
        console.log(error)
        res.status(500).send("Something went Wrong!");
    }

})

module.exports = router
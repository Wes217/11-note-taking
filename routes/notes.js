const router = require('express').Router();
const fs = require('fs');
const uuid = require('../helpers/uuid');

router.get('/',(req,res) => {
    console.log(`${req.method} request received for notes`);
    // reads file of saved notes
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        //returns saved notes
        res.json(JSON.parse(data));
    })
})

router.post('/',(req,res) => {
    console.log(`${req.method} request received for notes`);
    
    const {title,text} = req.body

    const newNote = {
        title,
        text,
        id: uuid(),
    }
    //reads file of saved notes
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        const parsedNotes = JSON.parse(data);
        // add new note to array of notes
        parsedNotes.push(newNote);
        // save all notes
        fs.writeFile('./db/db.json',
        JSON.stringify(parsedNotes)
        ,(err) => {
            if (err) throw err;
            console.log("Note added");
            res.json()
        })

      });    
})

router.delete('/:id', (req, res) => {
    console.log(`${req.method} request received for notes`);


    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        
        const parsedNotes = JSON.parse(data)
        const { id } = req.params;

        const noteIndex = parsedNotes.findIndex(note => note.id == id)

        parsedNotes.splice(noteIndex, 1);
    
        const noteString = JSON.stringify(parsedNotes)

        fs.writeFile('./db/db.json',
        noteString
        ,(err) => {
            if (err) throw err;

            console.log("Note deleted");
            res.json();
        })
    })
})

module.exports = router;
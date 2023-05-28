const router = require('express').Router();
const fs = require('fs');

router.get('/',(req,res) => {
    console.log(`${req.method} request received for notes`);
    // reads file of saved notes
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        //returnes saved notes
        res.json(JSON.parse(data));
    })
})

router.post('/',(req,res) => {
    console.log(`${req.method} request received for notes`);
    
    const {title,text} = req.body

    const newNote = {
        title,
        text,
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
        })

      });
      







    
})




module.exports = router;
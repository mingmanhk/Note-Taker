// Dependencies
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

module.exports = app => {
//Get api request
    app.get('/api/notes', (req, res) =>
    {
        console.log("\n\nGet request : request notes\n\n");
        readFromFile('./db/notes.json')
            .then((data) => {
                console.log(data)
                res.json(JSON.parse(data));
            })
    });
   
//Post api request
    app.post("/api/notes", (req, res) => {
        const newNote = req.body;
        readFromFile('./db/notes.json')
            .then
            (async (data) => {
                let notes = JSON.parse(data)
                if (newNote.id) {
                    console.log("\n\nPOST request : Update Note : " + JSON.stringify(newNote) + "\n\n");
                    notes=notes.filter( note => note.id.toString() !== newNote.id );
                } else {
                    newNote.id = uuidv4();
                    console.log("\n\nPOST request : New Note : " + JSON.stringify(newNote)+"\n\n");
                }
                notes.unshift(newNote);
                await writeToFile('./db/notes.json', notes)
                res.json(notes)
                })
    });

  
//Delete api request
    app.delete("/api/notes/:id", (req, res) => {
        console.log("\n\nDelete request : ID : " +req.params.id.toString()+"\n\n")
        readFromFile('./db/notes.json')
            .then
            (async (data) => {
                let notes = JSON.parse(data)
                notes=notes.filter( note => note.id.toString() !== req.params.id.toString() );
                await writeToFile('./db/notes.json', notes)
                res.json(notes)
                })
    });
}

const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    res.json(notes[id]);
});

app.post("/api/notes", function(req, res) {
    var newNote = req.body;

    newNote.id = notes.length;
  
    console.log(newNote);
  
    notes.push(newNote);

    fs.writeFile('db/db.json', JSON.stringify(notes), function(err) {

        if (err) {
          console.log(err);
        }
        else {
          console.log("Commit logged!");
        }
      
      });
    
  
    res.json(newNote);
  });

  app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      if (note.id === parseInt(id)) {
        notes.splice(i, 1);
      }
    }
    
    fs.writeFile('db/db.json', JSON.stringify(notes), function(err) {

      if (err) {
        console.log(err);
      }
      else {
        console.log("Committed!");
      }
    
    });

    res.json(notes);
      
  });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
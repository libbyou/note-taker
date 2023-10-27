const notes = require('express').Router();
const {
  readFromFile,
  readAndAppend,
//   writeToFile,
} = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4()
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully`, newNote);
    } else {
      res.error('Error in adding note');
    }
});
  
  module.exports = notes;
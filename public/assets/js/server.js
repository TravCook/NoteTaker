//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
// Dependencies
// ===========================================================
var express = require("express");
var fs = require("fs");
const { reset } = require("nodemon");
var path = require("path")

var app = express();
var PORT =  3001;
// process.env.PORT ||
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`public`))
// Routes
// ===========================================================
app.get("/", function(req, res){      //dispalys home page
  res.sendFile(path.join(__dirname, "index.html"))
})
app.get("/notes", function(req, res){ //displays note page
  res.sendFile(path.join(__dirname, "../../notes.html"))
})
app.get("/api/notes", function(req, res){ //reads db.json and sends to ajax call
  fs.readFile("../NoteTaker/db/db.json", "utf8", function(error, data){
    if(error){
      console.log(error)
    }else{
      var notes = JSON.parse(data)
      res.json(notes)
    }
  })
})
app.post("/api/notes", function(req, res){
  const note = req.body
  var notesList = require("../../../db/db.json")
  notesList.push(note)
  console.log(notesList)
  const listString = JSON.stringify(notesList)
  console.log(listString)
  fs.writeFile("../NoteTaker/db/db.json", listString, function(){
    console.log("Note Saved!")
  })
})
// Listener
// ===========================================================
app.listen(PORT, function(){
  console.log("Now youre listenning dummy")
})
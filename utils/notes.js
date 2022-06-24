const fs = require('fs');

//menampilkan semua data notes.json
const loadNote = () => {
    const fileBuffer = fs.readFileSync('data/notes.json', 'utf-8');
    const notes = JSON.parse(fileBuffer);
    return notes;
};


// menambah data
const saveNotes = (notes) => {
    fs.writeFileSync('data/notes.json', JSON.stringify(notes));
};
const addNote = (note) => {
    const notes = loadNote();
    notes.push(note);
    saveNotes(notes);
}

//mencari data by id
const findNote = (idNote) => {
    const notes = loadNote();
    const note = notes.find((note) => note.id == idNote);
    return note;
}
// hapus data
const deleteNote = (idNote) => {
    const notes = loadNote();
    const filteredNotes = notes.filter((note) => note.id != idNote);
    saveNotes(filteredNotes);
}

// edit data
const updateNote = (newNote) => {
    const notes = loadNote();
    const filteredNotes = notes.filter((note) => note.id != newNote.idOld);
    console.log(filteredNotes, newNote);
    delete newNote.idOld;
    filteredNotes.push(newNote);
    saveNotes(filteredNotes);
}

module.exports = { loadNote, addNote, findNote, deleteNote, updateNote };
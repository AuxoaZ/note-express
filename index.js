
const express = require('express')
const app = express()
const port = 3000
const expressLayouts = require('express-ejs-layouts');
const { loadNote, addNote, findNote, deleteNote, updateNote } = require('./utils/notes');


app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded());


//proses menampilkan data
app.get('/', (req, res) => {
    const notes = loadNote();
    console.log(notes);
    res.render('index', {
        layout: 'layouts/main-layout',
        notes

    });
})

//proses tambah data
app.post('/addNote', (req, res) => {
    let date = Date.now();
    let objectDate = { 'id': date }
    let join = Object.assign(req.body, objectDate)
    addNote(join);
    res.redirect('/');
})

//proses update data
app.post('/editNote', (req, res) => {
    let date = Date.now();
    let objectDate = { 'id': date.toString() }
    let join = Object.assign(req.body, objectDate);
    updateNote(join);
    res.redirect('/');
})

//proses hapus data
app.get('/note/delete/:id', (req, res) => {
    const note = findNote(req.params.id);
    // jika note tidak ada
    if (!note) {
        res.status(404);
        res.send('404');
    } else {
        deleteNote(req.params.id);
        res.redirect('/');
    }
})

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout'
    })
})
app.get('/tes', (req, res) => {
    // res.send('For add a note')
    res.json({
        nama: "Alvian N",
        hobi: "wibus"
    })
})

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

app.listen(process.env.PORT || 5000);
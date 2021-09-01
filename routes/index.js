// Dependencies
const path = require("path");

// Routing
module.exports = app =>{
    // GET note for homepage
    app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
    );

    // GET Route for notes page
    app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/notes.html'))
    );
}


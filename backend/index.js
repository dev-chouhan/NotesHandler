const connectToMongo = require('./db');
const cors = require("cors");
const express = require('express');
const app = express();
const port = 5000;
connectToMongo();

app.use(cors()); // This one is for fetching api through browser.
app.use(express.json());

// available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.get('/', (req, res)=>{
    res.send("Hello Dev!");
});

app.listen(port, ()=>{
    console.log(`iNoteBook Backend is listed at http://localhost:${port}`);
});

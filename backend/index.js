const connectToMongo = require('./db');
const express = require('express');
const app = express();
const port = 3000;
connectToMongo();

app.use(express.json());

// available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.get('/', (req, res)=>{
    res.send("Hello Dev!");
});

app.listen(port, ()=>{
    console.log(`Examples are listed at http://localhost:${port}`);
});

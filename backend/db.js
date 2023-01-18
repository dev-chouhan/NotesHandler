const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/?directConnection=true&tls=false&readPreference=primary";

const connectToMongo = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to mongoo Succesfully.");
    })
}

module.exports = connectToMongo;
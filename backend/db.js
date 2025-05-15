const mongoose = require("mongoose");

// Use environment variable for MongoDB URI if available, otherwise use localhost
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/inotebook2";

const connectToMongo = async () => {
    try {
        mongoose.set("strictQuery", false);
        
        // Using the new connection syntax (callback style is deprecated)
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectToMongo;

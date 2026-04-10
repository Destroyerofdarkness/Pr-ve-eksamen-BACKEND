const mongoose = require("mongoose");

async function connectToMongoDB(){
    try {
        await mongoose.connect(process.env.mongoDB);
        console.log("Succesfully connected to mongoDB on: ",mongoose.connection.name)
    } catch (err) {
        console.log("Couldn't connect to mongoDB cause: ",err)
    }
} 


module.exports = connectToMongoDB
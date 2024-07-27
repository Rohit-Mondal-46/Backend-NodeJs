const mongoose = require("mongoose")

async function connection(url){
    const newConnection = mongoose.connect(url)
    return newConnection
}

module.exports = {
    connection
}


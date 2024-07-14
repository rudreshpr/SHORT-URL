const mongoose = require('mongoose');

async function connectToMongoDB(url){
    return mongoose.connect(url).then(()=>{console.log('MongoDb Connected')}).catch((err)=>{console.log('Error'+err)});;
}

module.exports={connectToMongoDB}
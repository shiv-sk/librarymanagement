const  mongoose = require("mongoose");


const Dbconnection = async() => {
    try{
        const connection = mongoose.connect(process.env.DBSTRING);
        console.log("DB connection successfull")
    }catch(err){
        console.log("please fix this error " , err);
        process.exit(1);
    }
    
}

module.exports = Dbconnection;

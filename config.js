const dotenv=require('dotenv')
const sqlite3 = require('sqlite3').verbose();
const path=require('path')

dotenv.config()

const dbfile=process.env.DB_FILE
const db=new sqlite3.Database(path.resolve(dbfile),(err)=>{
    if(err){
        console.log(err.message)
    }else{
        console.log("connected to database")
    }
});

module.exports = db;
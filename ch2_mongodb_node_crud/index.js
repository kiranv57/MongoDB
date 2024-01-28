// establish mongodb connection using mongodbclient

//import express
const app = require('express')();

require('dotenv').config();

//import mongodb and extract MongoClient
const mongodb = require('mongodb');
const {MongoClient} = require('mongodb');

app.get('/', (req, res) => {
    console.log("hello");
});

app.listen(3000, ()=> {
    console.log("server is running");
});

//save the connection string
const uri = process.env.CONN_STRING;

//create an instance of mongoclient to establish connection with mongodb atlas using mongodb, not mongoose
const client = new MongoClient(uri, 
    { useNewUrlParser: true });

async function run(){

    try {
        
        await client.connect();
        console.log("mongodb database connection has been established");
       // client.close();    
    } catch (error) {
        console.log(error);
    }

}
run();

async function insert(entry){
    try {
        
        const collections = client.db("userDataT").collection("userProfile");
        
        
        await collections.insertOne(entry);

    } catch (error) {
            console.log(error);       
    }
}

const userEntry = {
    name: "jon",
    phone: "1234587556",
}

run();
async function exec () {
    await insert(userEntry);
    client.close();
}

exec();

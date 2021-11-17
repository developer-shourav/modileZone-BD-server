const express = require('express');
const bodyParser = require('body-parser') ;
const cors = require('cors') ;
require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p5q9k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



const port = process.env.PORT || 8000;
const app = express()

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));





app.get('/', (req, res) => {
    res.send('Hello Sir ! Welcome to modibleZoon BD server...')
})


client.connect(err => {
    const servicesCollection = client.db("modileZoneBd").collection("productsData");
   
   
    
    

      

});
  

app.listen(port, () => {
    console.log(`Running On the port:${port}`)
});



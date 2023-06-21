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

const corsConfig = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    }
app.use(cors(corsConfig))
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));





app.get('/', (req, res) => {
    res.send('Hello Sir ! Welcome to modibleZoon BD ')
})


client.connect(err => {
const productsCollection = client.db("modileZoneBd").collection("productsData");
const buyingCollection = client.db("modileZoneBd").collection("buyingData");

    //-------------- Add phones-------------------------

    app.post("/addProducts", async (req, res) => {

        const result = await productsCollection.insertOne(req.body);
        res.send(result);


    });
   


    //-------------- Get all phones-----------------------
    app.get("/allProducts", async (req, res) => {

        const result = await productsCollection.find({}).toArray();
        res.send(result);

    });
    
    
 //---------Get single Product--------------
    app.get("/singleProduct/:id", async (req, res) => {

        const result = await productsCollection.find({ _id: ObjectId(req.params.id) }).toArray();

        res.send(result[0]);
    });

      

//---------Confirm purches--------------
    app.post("/confirmPurchese", async (req, res) => {
        const result = await buyingCollection.insertOne(req.body);
        res.send(result);

    });


//--------------  My confirmOrders--------
    app.get("/myOrders/:email", async (req, res) => {
        const result = await buyingCollection.find({ email: req.params.email }).toArray();
        res.send(result);
    })



//--------------Delete Order ----------------
    app.delete("/deleteOrder/:id", async (req, res) => {
        const result = await buyingCollection.deleteOne({ _id: ObjectId(req.params.id), });

        res.send(result);
    });


    //update statuses
    app.put("/updateStatus/:id", (req, res) => {
        const id = req.params.id;
        const updateStatus = req.body.status;
        const filter = { _id: ObjectId(id) };
        console.log(updateStatus);
        buyingCollection.updateOne(filter, { $set: { status: updateStatus }, })
            .then((result) => {
                res.send(result);
            });
    })







});
  

app.listen(port, () => {
    console.log(`Running On the port:${port}`)
});



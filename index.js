const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 8000;
const app = express()



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p5q9k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  


// Middleware
const corsConfig = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    }
  app.use(cors(corsConfig))
  app.use(express.json())


async function run() {

    try {
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


        // Send a ping to confirm a successful connection
       await client.db("admin").command({ ping: 1 });
       console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }

    finally {
        // Ensures that the client will close when you finish/error
        /* await client.close(); */
      }

}

run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Hello Sir ! Welcome to modibleZoon BD ')
})

app.listen(port, () => {
    console.log(`Running On the port:${port}`)
});



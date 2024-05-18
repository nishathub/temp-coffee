const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleware 

app.use(cors());
app.use(express.json());


// MONGO CODE START

// get username and pass from env: 
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("coffeeDB");
        const coffeeCollection = database.collection("coffee");

        // GET (READ)
        app.get('/coffee', async(req, res) => {
            coffee = await coffeeCollection.find().toArray();
            res.send(coffee);
        })

        // GET(READ) single data

        app.get('/coffee/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id : new ObjectId(id)};
            const result = await coffeeCollection.findOne(query);
            res.send(result);

        })

        // POST (CREATE)
        app.post('/coffee', async(req, res) => {
            newCoffee = req.body;
            const result = await coffeeCollection.insertOne(newCoffee);
            res.send(result);

        })

        // PUT (Update)
        app.put('/coffee/:id', async(req, res) => {
            const coffee = req.body;
            const { name, supplier, chef, category, details, taste, photo} = coffee;
            const id = req.params.id;
            const filter = {_id : new ObjectId (id)};
            const options = {upsert : true};
            const updateCoffee = {
                $set: {
                    name: name,
                    supplier: supplier,
                    chef: chef,
                    category: category,
                    details: details,
                    taste: taste,
                    photo: photo,
                }
            };
            const result = await coffeeCollection.updateOne(filter, updateCoffee, options);
            res.send(result);

        })

        // DELETE 
        app.delete('/coffee/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id : new ObjectId(id)};
            const result = await coffeeCollection.deleteOne(query);
            res.send(result);

        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// MONGO CODE END

app.get('/', (req, res) => {
    res.send('coffee server is running');
})

app.listen(port, () => {
    console.log(`coffee server is running on port : ${port}`);
})
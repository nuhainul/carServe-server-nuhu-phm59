# Steps Followed:

1. Created <code>steps.md</code>

2. created <code>index.js</code>

3. opened package.json and add
   <code>"start":"node index.js"</code>, after line-6 (<code>"scripts": {</code>)

4. went to index.js to start coding
   <pre><code>
   const express = require('express');
   const cors = require('cors');
   const app = express();
   const port = process.env.PORT || 5000; 
   // middlewares
   app.use(cors());
   app.use(express.json());

   app.get('/', (req, res) => {
   res.send('CarServe server is running')
   })

   app.listen(port, () => {
   console.log(`CarServe server is running on port: ${port}`);
   })
   </code></pre> 

5. went to MongoDB atlas website > database > connect > copied full code 
<pre><code>

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<username>:<password>@cluster0.mcet7hn.mongodb.net/?retryWrites=true&w=majority";

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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
</code></pre>

6. went to <code>index.js</code> to paste the above code below 
   <pre>
   <code>
   // middlewares 
   app.use(cors());
   app.use(express.json());
   </code>
   </pre>

7. moved the line <code>const { MongoClient, ServerApiVersion } = require('mongodb');</code> to top site (at line-3) 

8. went to <code>npmjs.com/package/dotenv</code> and copied <code>npm install dotenv --save</code> to install locally via terminal 

9. go to MongoDB > Database Access > Add New Database User 

10. create a user with "read & write to any database" privileges (and do not generate password with Google, use the built-in one instead) and finally click on the "Add User" button   

11. create <code>.env</code> file in the root folder (where <code>package.json</code> is)

12. write the following codes there (and replace the actualUsername with the user created in mongodb and the actualPassword with the password set for that user) 
    <pre><code>
      DB_USER=<actualUsername>
      DB_PASS=<actualPassword>
    </code></pre>

13. go to <code></code> and copy the following 
    <pre><code>
    require('dotenv').config()
   console.log(process.env) // remove this after you've confirmed it is working
   </code></pre>

14. now paste the code below <code>const { MongoClient, ServerApiVersion } = require('mongodb');</code>  

15. check the terminal if the username & password are consoled (though some other errors may be there) 

16. now covert <code>const uri = "mongodb+srv://<username>:<password>@cluster0.mcet7hn.mongodb.net/?retryWrites=true&w=majority";</code> into a template string withe .env data as <code>const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mcet7hn.mongodb.net/?retryWrites=true&w=majority`;</code> 

17. now check the terminal if <code>Pinged your deployment. You successfully connected to MongoDB!</code>. You must stop any VPN app running, VPNs may cause problems.  
18. create a <code>.gitignore</code> file in the root directory and add two lines: <code>node_modules</code> and <code>.env</code> 
19. now check if git is ignoring these two via <code>git init</code> and <code>git status</code>

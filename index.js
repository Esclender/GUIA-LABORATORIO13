import mongodb from "mongodb"
const { MongoClient, ServerApiVersion } = mongodb;

const uri = "mongodb+srv://e00181703:zGju3VAVTcVj8ALA@cluster0.xzeljne.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
)



async function run() {
  try {
    await client.connect();
    await client.db("guiaLab").command({ ping: 1 });
    return client
  }catch(error){
    console.log(error)
  }
}

run()
  .then(async res => {
    console.log("Connected");
    return res
  })
  .then(async res => await res.close())

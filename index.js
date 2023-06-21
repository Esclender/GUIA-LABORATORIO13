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

async function obtenerPokemones(clientDB){
  console.log("Mostrando datos....");
  try{
    const db = clientDB.db("guiaLab");
    const coll = db.collection("pokemons");
    const result = await coll.find({}).toArray();
    let pokemons = []

    return new Promise((res, rej) =>{
      result.forEach(element => {
        pokemons.push(element)
      })
      res(console.log(result))
    })

  }catch(err){
    console.log(err)
  }
}

async function crearPokemon(clientDB, info){
  console.log("Guardando info...")
  console.log(info)

  try{
    const db = clientDB.db("guiaLab");
    const coll = db.collection("pokemons");
    await coll.insertOne(info);

    console.log("Info Guardada!")

    return info._id
  }catch(err){
    console.log(err)
  }
}

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

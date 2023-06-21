import mongodb from "mongodb";
const { MongoClient, ServerApiVersion } = mongodb;

const uri =
  "mongodb+srv://e00181703:zGju3VAVTcVj8ALA@cluster0.xzeljne.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function obtenerPokemones(clientDB) {
  console.log("Mostrando datos....");
  try {
    const db = clientDB.db("guiaLab");
    const coll = db.collection("pokemons");
    const result = await coll.find({}).toArray();
    let pokemons = [];

    return new Promise((res, rej) => {
      for (let i = 100; i < result.length; i++) {
        pokemons.push(result[i])
      }
      res(console.log(pokemons))
    });
  } catch (err) {
    console.log(err);
  }
}

async function crearPokemon(clientDB, info) {
  console.log("Guardando info...");
  console.log(info);

  try {
    const db = clientDB.db("guiaLab");
    const coll = db.collection("pokemons");
    await coll.insertOne(info);

    console.log("Info Guardada!");

    return info._id;
  } catch (err) {
    console.log(err);
  }
}

async function updatePokemon(clientDB, id, info) {
  console.log("Actualizando info...");
  console.log(info);

  try {
    const db = clientDB.db("guiaLab");
    const coll = db.collection("pokemons");

    const filter = { _id: id };
    const updateDoc = {
      $set: {
        ...info,
      },
    };

    const result = await coll.updateOne(filter, updateDoc);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s),`
    );

    console.log("Actualizado exitosamente.");
  } catch (err) {
    console.log(err);
  }
}

async function deletePokemon(clientDB, id){
  console.log("Borrando info...")

  try{
    const db = clientDB.db("guiaLab");
    const coll = db.collection("pokemons");
    
    const filter = { _id:id };
    const result = await coll.deleteOne(filter)

    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }

  }catch(err){
    console.log(err)
  }
}

async function run() {
  try {
    await client.connect();
    await client.db("guiaLab").command({ ping: 1 });
    return client;
  } catch (error) {
    console.log(error);
  }
}

run()
  .then(async (res) => {
    await obtenerPokemones(res)
    const updateId = await crearPokemon(res, {name:"Pickachu"})
    await obtenerPokemones(res)
    await updatePokemon(res,updateId,{name:"Pickachu 4"})
    await obtenerPokemones(res)
    await deletePokemon(res,updateId)
    await obtenerPokemones(res)
    return res
  })
  .then(async res => await res.close())

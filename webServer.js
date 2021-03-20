//--IMPORTAR DEPENDENCIAS
const express = require ('express')
const dotenv = require ('dotenv').config
 const uuidv4 = require ('uuid');
 //const uuidv4 = require ('uuid/v4'); -------> CON V4 salta error --REVISAR!!!!!

 // Configuracion inicial

const server =express();
//process.argv[2] -->es un proceso interno de process para buscarte un puerto si el que quieres usar esta ocupado.
//  const listenPort = process.argv[2] || process.env.PORT || 8080;
const listenPort= "8080"



//configuracion mongo
const MongoClient = require ('mongodb').MongoClient;
// const url = process.env.MONGO_URL;
const url="mongodb://localhost/27017"

//fallo con el .env al recoger el process, --REVISAR!!!!!!

// JSON support
server.use(express.urlencoded({ extended: true }));
server.use(express.json());


server.listen(listenPort,
  () => console.log(`Server started listening on ${listenPort}`)
);

//CONECT MONGO
MongoClient.connect(url, {useUnifiedTopology:true},function(err,db){
  if(err) throw err;
  console.log("connected bd")
  let dbo= db.db("mydb")
  let dboCollection= dbo.collection('date');

 

    // //-----------------CRUD-------------------------------
    // //GET
    // server.get('/',(req, res) =>{
        
    //   dboCollection.find({},(err, result) => {
    //     if (err) return res.status(500).send({message:"error en la peticion"});
    //     if (!dboCollection) return res.status(404).send({message:"error no existe la bd"});
    //     res.send(200, {result})
        
    //   })
      
        
    

    // dboCollection.find({}, (err, names)=>{
    //     if(err)  throw error;
    //     if(!names)  throw error;
    //     res.send(200,{names});    

    // })
    
//     })
// //get se puede hacer en una!!
//     // GET PARAM FILTRO CAMPO NAME
//     server.get('GET/quotes/:name',(req, res) =>{
//     let params = req.params.name
//     let body= req.body
//     dboCollection.find(`{},{params:1}`)
      
//         res.send(JSON.stringify("dfahjdla"));
//       })
      

    //POST
    server.post('POST/create', async (req,res) =>{
    //falta inserta id
    let newId= uuidv4();
    let body = req.body;
  let params = req.query; 
 
   await dbo.collection("date").insertOne(body,(err, res)=>{
      if(err){console.log("no funciona")}
    console.log("hecho")
    //enviar un res para que postman sabe rque ha llegado
      res.send(JSON.stringify("new data added successfully"))
    })
    })

    // '''
    // // //PUT
    // server.put('PUT/modify/:id', (req, res)=>{
    // let quoteId= req.params.id
    // let name=req.params.name
    // let quote=req.params.quote
    // dboCollection.updateOne(`{id:${quoteId}},{name:${name},quote:${quote}}}`)
    // res.send(JSON.stringify("data modify successfully"))

    // })

    // //DELETE
    // server.put('DELETE/delete/:id', (req, res)=>{
    //   let quoteId= req.params.id

    //   dboCollection.delete(`{id:${quoteId}}`)
    //   res.send(JSON.stringify("data delete successfully"))
      
    //   })



//cerramos db  ()
   db.close();
});     
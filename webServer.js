//--IMPORTAR DEPENDENCIAS
const express = require ('express')
const dotenv = require ('dotenv').config
 

// Configuracion inicial
const server =express();
// const listenPort = process.argv[2] || process.env.PORT || 8080;
const listenPort = process.env.PORT;


//configuracion mongo
const MongoClient = require ('mongodb').MongoClient;
const url = process.env.MONGO_URL;


// JSON support
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

  

//CONECT MONGO
MongoClient.connect(url, {useUnifiedTopology:true},function(err,db){
  if(err) throw err;
  console.log("connected bd")
  let dbo= db.db("mydb")
  let dboCollection= dbo.collection('date');



    //-----------------CRUD-------------------------------
    //GET
    server.get('GET/quotes',(req, res) =>{
    let params = req.query
    let body= req.body
    dboCollection.find()
      .then(data =>{
        res.send(JSON.stringify(data));
      })

    })

    // GET PARAM FILTRO CAMPO NAME
    server.get('GET/quotes/:name',(req, res) =>{
    let params = req.params.name
    let body= req.body
    dboCollection.find(`{},{params:1}`)
      .then(data =>{
        res.send(JSON.stringify(data));
      })
      
    })

    //POST
    server.post('POST/create',(req,res) =>{
    //falta inserta id
    let newInsert=`{name:${req.body.name},quote:${req.body.quote}}`;
    dbo.collection("date").insertOne(newInsert,(error, res)=>{
      if(error){console.log("no funciona")}
    console.log("hecho")
    db.close();

    })
    })


    //PUT
    server.put('PUT/modify/:id', (req, res)=>{
    let quoteId= req.params.id
    let name=req.params.name
    let quote=req.params.quote
    dboCollection.updateOne(`{id:${quoteId}},{name:${name},quote:${quote}}}`)


    })

    //DELETE
    server.put('DELETE/delete/:id', (req, res)=>{
      let quoteId= req.params.id

      dboCollection.delete(`{id:${quoteId}}`)
      
      
      })




   db.close();
});     
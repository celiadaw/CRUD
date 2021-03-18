-Construye una simple CRUD app con Node, Express y MongoDB:

* PARA ESTE EJERCICIO NO TRABAJAREMOS CON FRONTEND, TODAS LAS PRUEBAS DEBES REALIZARLAS EN POSTMAN.

 1. Npm init e instala las dependencias node, express, nodemon, dotenv, y MongoDb en tu proyecto.

 2. Monta tu servidor.

 3. Conecta con Mongodb, usando el método MongoClient.

 4. Crea tu database y tu collection en MongoDB por consola.Esta es la única vez que usarás la consola para realizar el ejercicio, para el resto de operaciones usaremos Postman.

 5.Crea la variable db con la conexión para acceder a MongoDB. Los controladores de solicitudes Express deben de estar dentro de la llamada de MongoClient.
    
Conexión con MongoClient:     
  	 
MongoClient.connect(/* ... */)
  .then(client => {
	// ...
	const db = client.db('tu-db-quotes')
	app.get(/* ... */)
	app.post(/* ... */)
	app.put(/* ... */)
	app.delete(/* ... */)
  })
  .catch(console.error)

 6. Primer endpoint GET/quotes, devolverá el contenido completo de la database. Además aceptará query params opcionales que permitan recibir la petición de un sólo documento filtrando por el campo "name".
 
7. Segundo endpoint POST/create, creará nuevo contenido en la database.Recibirá por request body un campo "name" y un campo "quote". En este endpoint generaremos un "id" para almacenar junto con los datos anteriores. Puedes  buscar un paquete npm para generar automáticamente un uuid.

 8. Tercer endpoint PUT/modify/:id, buscará por el id recibido el documento a actualizar y lo actualizará con la información recibida por body.
 
9. Cuarto endpoint DELETE/delete/:id, buscará por el id recibido un documento y eliminará.

BONUSTRACK: Mejorar el proyecto aplicando orientación a objetos.

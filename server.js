// importación de los modulos express
import db from "./app/config/db.js";
import express from "express";
// y archivos de rutas
import tutorial from './app/routes/tutorial.js';
import comment from './app/routes/comment.js';

// utilizamos express pero lo guardamos en app para acceder a sus funcionalidades
const app = express();
// definición del puerto 
const port = process.env.PORT || 8080;
// analizar solicitudes de tipo de contenido - application/json
app.use(express.json());
// analizar solicitudes de tipo de contenido - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Una ruta simple para comprobar
app.get("/", (req, res) => {
  res.json({ mensaje: "Bienvenid@ al API :]" })
})
// implementar el uso de las dos rutas que hay 
app.use('/', comment)
app.use('/', tutorial)
// el servidor escucha y 
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto: ${port}`);
});
// usamos try por que hay probabilidad de que falle algo en la conexión del servidor
// Prueba de Conexión a la BD
try {
  /* podemos usar try para detener la ejecución de la función hasta que se complete un proceso asincrono */
  /* await permite esperar que el proceso asincrono se complete antes de continuar la ejecución de la función  */
  await db.authenticate();  // se utiliza para conectarse con la base de datos y comprueba si las credenciales proporcionadas son correctas
  console.log('Conexión Correcta con la Base de Datos')

  db.sync();
  console.log('La Base de Datos está sincronizada')
} catch (error) {
  console.log(error)
}

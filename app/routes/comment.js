/* Cuando un cliente envía una solicitud para un punto final mediante una 
solicitud HTTP (GET, POST, PUT, DELETE), debemos determinar cómo responderá 
el servidor configurando las rutas. */ 

// importamos los rutas del controlador comment.js para utilizarlas
import { createComment, deleteCommentByID, findAllComments, findCommentByID, updateComment } from '../controllers/comment.js';
// importamos express
import express from 'express';
// creamos una constante llamada router para usar express
const router = express.Router(); // Una Routerinstancia es un sistema de enrutamiento y middleware completo

router.get( "/comment/:id", findCommentByID ); // ruta para encontrar commment por id
router.get( "/comments/", findAllComments ); // ruta para encontrar todos los commment
router.post( "/comment/register",createComment ); // ruta para crear un commment
router.put( "/comment/update/:id",updateComment ); // ruta para crear un commment
router.delete( "/comment/delete/:id",deleteCommentByID );// ruta para eliminar un commment por su id

export default router; // exporta por defecto router
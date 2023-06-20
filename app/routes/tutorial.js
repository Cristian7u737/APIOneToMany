/* Cuando un cliente envía una solicitud para un punto final mediante una 
solicitud HTTP (GET, POST, PUT, DELETE), debemos determinar cómo responderá 
el servidor configurando las rutas. */ 
import { createTutorial, deleteTutorialByID, findAllTutorials, findTutorialByID, updateTutorialByID } from '../controllers/tutorial.js';
// importamos los rutas del controlador comment.js para utilizarlas
import express from 'express';
// importamos express
const router = express.Router(); // Una Routerinstancia es un sistema de enrutamiento y middleware completo

router.get( "/tutorial/:id", findTutorialByID ); // ruta para encontrar commment por id
router.get( "/tutorials/", findAllTutorials ); // ruta para encontrar todos los commment
router.post( "/tutorial/register/:id", createTutorial ); // ruta para crear un commment
router.put( "/tutorial/update/:id", updateTutorialByID ); // ruta para crear un commment
router.delete( "/tutorial/delete/:id", deleteTutorialByID ); // ruta para eliminar un commment por su id

export default router; // exporta por defecto router
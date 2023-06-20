// importamos el modelo de comment
import Comment from "../models/Comment.js";
// Encuentra un solo comment con una identificación
const findCommentByID = async (req, res) => {
  const { id } = req.params; // desestructura el objeto json para obtener el parametro id apartir de req
  const comment = await Comment.findOne({ where: { id } }); // recupera exactamente UNA fila de todas las filas que coinciden con la consulta SQL
  // si comment es diferente
  if (!comment) {
    return res.status(404).json({ // retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado.
      mensaje: `No existe el comment con el ID: ${id}.` // manda un mensaje acerca del tutorial que no se encontro con el id
    });
  }

  res.json(comment) // responde la solicitud en formato JSON de lo que se almaceno en comment
}
// Recuperar todos los comments de la base de datos.
const findAllComments = async (req, res) => {
  const allComments = await Comment.findAll( /* {include: "tb_player"} */); // devolverá las filas de su tabla como una matriz de objetos./* {include: "tb_games"} */);
  res.json(allComments); // responde la solicitud en JSON con lo que contiene allTutorials
  return false;
};
// Crear y guardar un nuevo comment
const createComment = async (req, res) => {
  const { name, text } = req.body // desestructura el objeto json para obtener el name y text del request.body
  console.log(req.body); // imprime lo que tiene 
  try { /* podemos usar try para detener la ejecución de la función hasta que se complete un proceso asincrono */
    /* await permite esperar que el proceso asincrono se complete antes de continuar la ejecución de la función  */
    const newComment = await Comment.create({ // combina los métodos build(// crea una instancia no persistente , lo que significa que los datos aún no se guardan en la base de datos, sino que se almacenan solo en la memoria, durante la ejecución. sin modificar nada en la tabla subyacente no es un método asíncrono) save(// Almacena los datos de la instancia construida por el método .build() en la base de datos.)
      name,
      text
    })
    return res.json({ mensaje: `El comment ha sido creado` }); //retorna la respuesta de la solicitud en JSON donde mostramos un mensaje
  }

  catch (error) { // maneja el rechazo de la promesa y atrapa el error
    console.log(error) // imprime el error
    return res.json({ mensaje: `Hubo un error al crear el comment, por favor intenta de nuevo` }) // retorna la respuesta de la solicitud y manda una respuesta en JSON del error
  }
}
// Actualizar un comment por el id en la solicitud
const updateComment = async (req, res) => {
  const { id } = req.params;// desestructura el objeto json para obtener el parametro id apartir de req
  const { body } = req;// desestructura el objeto json para obtener el body del request
  /* podemos usar try para detener la ejecución de la función hasta que se complete un proceso asincrono */
  try {
    // almacena la constante tutorial la cual espera una función asincrona 
    const comment = await Comment.findOne({// recupera exactamente UNA fila de todas las filas que coinciden con la consulta SQL
      where: { id }// donde el id 
    });

    if (!comment) {// si Tutorial es diferente
      return res.status(404).json({// retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado.
        mensaje: `No existe el comment con el ID: ${id}.`
      });
    }
    // manda un mensaje acerca del tutorial que no se encontro con el id
    await comment.update(body);// actualizará las filas de la tabla con los valores que pasó como su primer argumento.
    res.json(comment);// responde la solicitud en JSON con lo que contiene Tutorial

  } catch (err) {// maneja el rechazo de la promesa y atrapa el error
    res.json(err);// y manda una respuesta en JSON del error
  }

}
// Eliminar un Tutorial con el id especificado en la solicitud
const deleteCommentByID = async (req, res) => {
  const { id } = req.params;// desestructura el objeto json para obtener el parametro id apartir de req
  // almacena la constante tutorial la cual espera una función asincrona 
  const comment = await Comment.findOne({// recupera exactamente UNA fila de todas las filas que coinciden con la consulta SQL
    where: { id }// donde el id
  });
  // si Tutorial es diferente
  if (!comment) {
    return res.status(404).json({// retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado.
      mensaje: `No existe el comment con el ID: ${id}.`// manda un mensaje acerca del tutorial que no se encontro con el id
    });
  }

  await comment.destroy();// eliminará todas las filas que coincidan con la where condición especificada.
  res.json({ mensaje: `El comment con el ID ${id} ha sido eliminado.` })// manda un mensaje acerca del tutorial se ha eliminado con el id

};

/* const findCommentByNickname = async (req, res) => {
  const { nickname } = req.params;
  const comment = await Comment.findOne({
    where: { nickname }
  });

  if (!comment) {
    return res.status(404).json({
      mensaje: `No existe el comment con el NICKNAME: ${nickname}.`
    });
  }

  res.json(comment)
}; */

export {
  findCommentByID,
  findAllComments,
  createComment,
  updateComment,
  deleteCommentByID,
  /* findCommentByNickname, */
};

import Tutorial from '../models/Tutorial.js';
// Encuentra un solo tutorial con una identificación
const findTutorialByID = async (req, res) => {
  const { id } = req.params; // desestructura el objeto json para obtener el parametro id apartir de req
  const Tutorial = await Tutorial.findOne({ where: { id } }); // recupera exactamente UNA fila de todas las filas que coinciden con la consulta SQL
  // si Tutorial es diferente
  if (!Tutorial) {
    return res.status(404).json({ // retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado.
      mensaje: `No existe el comment con el ID : ${id}.` // manda un mensaje acerca del tutorial que no se encontro con el id
    });
  }

  res.json(Tutorial) // responde la solicitud en formato JSON de lo que se almaceno en Tutorial
}
// Recuperar todos los tutoriales de la base de datos.
const findAllTutorials = async (req, res) => {
  const allTutorials = await Tutorial.findAll(/* {include: "tb_player"} */); // devolverá las filas de su tabla como una matriz de objetos.
  res.json(allTutorials); // responde la solicitud en JSON con lo que contiene allTutorials
  return false;
}
// Crear y guardar un nuevo tutorial
const createTutorial = async (req, res) => {
  const { body } = req; // desestructura el objeto json para obtener el body del request
  const { id } = req.params; // desestructura el objeto json para obtener el parametro id apartir de req
  /* podemos usar try para detener la ejecución de la función hasta que se complete un proceso asincrono */
  try {
    // almacena la constante tutorial construyendo en memoria la BD mediante el parametro extraido del req body
    const Tutorial = Tutorial.build(body); // crea una instancia no persistente , lo que significa que los datos aún no se guardan en la base de datos, sino que se almacenan solo en la memoria, durante la ejecución. sin modificar nada en la tabla subyacente no es un método asíncrono
    Tutorial.id = id; // se accede a la propiedad id del modelo/tabla de tutorial y se asigna al req de param
    /* await permite esperar que el proceso asincrono se complete antes de continuar la ejecución de la función  */
    await Tutorial.save() // Almacena los datos de la instancia construida por el método .build() en la base de datos.
      .then(result => {  // maneja el exito de la promesa 
        res.json(result); // y el resultado de la petición en JSON lo envia adjuntando el result
      })
      .catch(err => { // maneja el rechazo de la promesa y atrapa el error 
        switch (err.name) { // mediante un switch determinamos el tipo de error mediante su nombre
          case "SequelizeValidationError":
            res.json(err.errors[0].message)
            break;
          case "SequelizeDatabaseError":
            res.json(err.original.sqlMessage)
          default:
            break;
        }
      });
  } catch (error) { // maneja el rechazo de la promesa y atrapa el error
    res.json(error) // y manda una respuesta en JSON del error
  }

}
// Actualizar un Tutorial por el id en la solicitud
const updateTutorialByID = async (req, res) => {
  const { id } = req.params; // desestructura el objeto json para obtener el parametro id apartir de req
  const { body } = req; // desestructura el objeto json para obtener el body del request
  /* podemos usar try para detener la ejecución de la función hasta que se complete un proceso asincrono */
  try {
    // almacena la constante tutorial la cual espera una función asincrona 
    const Tutorial = await Tutorial.findOne({ // recupera exactamente UNA fila de todas las filas que coinciden con la consulta SQL
      where: { id } // donde el id 
    });

    if (!Tutorial) { // si Tutorial es diferente
      return res.status(404).json({ // retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado.
        mensaje: `No existe la el tutorial con el ID: ${id}.` // manda un mensaje acerca del tutorial que no se encontro con el id
      });
    }

    await Tutorial.update(body); // actualizará las filas de la tabla con los valores que pasó como su primer argumento.
    res.json(Tutorial); // responde la solicitud en JSON con lo que contiene Tutorial
  } catch (error) { // maneja el rechazo de la promesa y atrapa el error
    res.json(error) // y manda una respuesta en JSON del error
  }
}
// Eliminar un Tutorial con el id especificado en la solicitud
const deleteTutorialByID = async (req, res) => {
  const { id } = req.params; // desestructura el objeto json para obtener el parametro id apartir de req
  // almacena la constante tutorial la cual espera una función asincrona 
  const Tutorial = await Tutorial.findOne({ // recupera exactamente UNA fila de todas las filas que coinciden con la consulta SQL
    where: { id } // donde el id
  });
  // si Tutorial es diferente
  if (!Tutorial) {
    return res.status(404).json({ // retorna la respuesta de la solicitud con el estatus 404. El servidor no pudo encontrar el recurso solicitado.
      mensaje: `No existe el comment con el ID: ${id}.` // manda un mensaje acerca del tutorial que no se encontro con el id
    });
  }

  await Tutorial.destroy(); // eliminará todas las filas que coincidan con la where condición especificada.
  res.json({ mensaje: `El Tutorial con el ID ${id} ha sido eliminado.` }); // manda un mensaje acerca del tutorial se ha eliminado con el id

}

/* const findAllTutorialsByPlayer = async ( req, res ) => {
    const { nickname } = req.params;
    const Tutorial = await Tutorial.findOne({ 
      where: { nickname } 
    });
  
    if ( !Tutorial ) {
      return res.status( 404 ).json({
        mensaje: `No existe el comment con el NICKNAME: ${nickname}.`
      });
    } 
  
    res.json( player )
};

const findAllTutorialsByPlayerNickname = async ( req, res ) => {
    const { nickname } = req.params;
    const Tutorial = await Tutorial.findOne({ 
      where: { nickname } 
    });
  
    if ( !Tutorial ) {
      return res.status( 404 ).json({
        mensaje: `No existe el comment con el NICKNAME: ${nickname}.`
      });
    } 
  
    res.json( player )
}; */



export {
  findTutorialByID,
  findAllTutorials,
  createTutorial,
  updateTutorialByID,
  deleteTutorialByID,
  /* findAllTutorialsByPlayer,
  findAllTutorialsByPlayerNickname */
}
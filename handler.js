'use strict';
const consumer = require('./services/consumer/index')
const md5 = require('md5')
const responses = require('./responses/apiResponses')
const os = require('os')
const dynamo = require('./db/dynamoDB')


const postsTable = process.env.POST_TABLE_PEOPLE || 'people';
const postsTablePlanet = process.env.POST_TABLE_PLANET || 'planet';

function sortBtId(a,b){
  if(a.createdAt > b.createdAt) return -1;
  return 1;
}

/*** 
 * @SECCION
 * @PEOPLE
 * SECCION DE LAMBDAS PARA MODELO 'PEOPLE'
 */

/** REALIZA LA QUERY A DYNAMODB, SI EXISTE LO MUESTRA, SINO  CONSULTA (API -STAR WARS) Y GUARDA */
module.exports.createPost = async (event, context, callback) => {  
  try {
    const numberPeople = event.pathParameters.number;
    const res = await dynamo.getByID(md5(numberPeople), postsTable);
    console.log(res)
    if(!res || !res.Item){
      const peopleConsumer = await consumer.getPeople(numberPeople);
      if(peopleConsumer){
        const post = {
          id: md5(numberPeople),
          createdAt: new Date().toISOString(),
          type: 1, // indicando que es para peoples
          ...peopleConsumer
        }
        const resSave = await dynamo.saveItem(postsTable, post);
        return callback(null, responses._201(post))
      }
    }else{
      return callback(null, responses._200(res.Item))
    }
    
  } catch (error) {
    callback(null, responses._500(error))
  }
};

/** REALIZA LA QUERY A DYNAMODB, OBTIENE TODOS LOS DATOS GUARDADOS  */
module.exports.getAllPots = async (event, context, callback) => {
  try {
    const res = await dynamo.getAll(postsTable, 1);
    return callback(null, responses._200(res.Items.sort(sortBtId)))
  } catch (error) {
    return callback(null, responses._500({msm: error}))
  }
};

/** REALIZA LA QUERY A DYNAMODB DE CIERTO RANGO DE REGISTROS */
module.exports.getPots = async (event, context, callback) => {    
  try {
    const numberPost = event.pathParameters.number;
    const res = await dynamo.getItemLimit(postsTable, numberPost);
    return callback(null, responses._200(res.Items.sort(sortBtId)));
  } catch (error) {
    return callback(null, responses._500(error))
  }
};

/** REALIZA LA QUERY A DYNAMODB, SI EXISTE LO MUESTRA, SINO  CONSULTA (API -STAR WARS) Y GUARDA */
module.exports.getPot = async (event, context, callback) => {  
  try {
    const idPost = event.pathParameters.id;
    const res = await dynamo.getByID(idPost, postsTable);
    console.log(res)
    if(!res.Item) return callback(null, responses._200({msm: 'Not found'}));
    return callback(null, responses._200(res.Item));
  } catch (error) {
    console.log(error)
    return callback(null, responses._500(error))
  }
};

/** REALIZA LA QUERY A DYNAMODB, ACTUALIZA SI EXISTE, SINO NO ACTUALIZA */
module.exports.putPost = async (event, context, callback) => {
  try {
    const idPost = event.pathParameters.id;
    const dataForm = JSON.parse(event.body)
    const paramName = dataForm.paramName;
    const paramValue = dataForm.paramValue;

    const res = await dynamo.updateItem(idPost, postsTable, paramName, paramValue);
    return callback(null, responses._200({message: 'Update Success'}));
  } catch (error) {
    return callback(null, responses._500(error))
  }
};

/** REALIZA LA QUERY A DYNAMODB, ELIMINA EL REGISTRO */
module.exports.deletePost = async (event, context, callback) => {
  try {
    const idPost = event.pathParameters.id;
    await dynamo.deleteIten(idPost, postsTable);
    return callback(null, responses._200({message: 'Delete Success'}))
  } catch (error) {
    return callback(null, responses._500(error))
  }
};


/*** 
 * @SECCION
 * @PLANET
 * SECCION DE LAMBDAS PARA MODELO 'PLANET'
 */

 /** REALIZA LA QUERY A DYNAMODB, SI EXISTE LO MUESTRA, SINO  CONSULTA (API -STAR WARS) Y GUARDA */
module.exports.createPlanet = async (event, context, callback) => {  
  try {
    const numberPlanet = event.pathParameters.number;
    const res = await dynamo.getByID(md5(numberPlanet), postsTablePlanet);
    if(!res || !res.Item){
      const planetConsumer = await consumer.getPlanet(numberPlanet);
      if(planetConsumer){
        const post = {
          id: md5(numberPlanet),
          createdAt: new Date().toISOString(),
          type: 2, // indicando que es para planets
          ...planetConsumer
        }
        const resSave = await dynamo.saveItem(postsTablePlanet, post);
        return callback(null, responses._201(post))
      }
    }else{
      return callback(null, responses._200(res.Item))
    }
    
  } catch (error) {
    callback(null, responses._500(error))
  }
};

/** REALIZA LA QUERY A DYNAMODB, OBTIENE TODOS LOS DATOS GUARDADOS  */
module.exports.getAllPlanet = async (event, context, callback) => {
  try {
    const res = await dynamo.getAll(postsTablePlanet);
    return callback(null, responses._200(res.Items.sort(sortBtId)))
  } catch (error) {
    return callback(null, responses._500({msm: error}))
  }
};

/** REALIZA LA QUERY A DYNAMODB DE CIERTO RANGO DE REGISTROS */
module.exports.getPlanets = async (event, context, callback) => {    
  try {
    const numberPlanet = event.pathParameters.number;
    const res = await dynamo.getItemLimit(postsTablePlanet, numberPlanet);
    return callback(null, responses._200(res.Items.sort(sortBtId)));
  } catch (error) {
    return callback(null, responses._500(error))
  }
};

/** REALIZA LA QUERY A DYNAMODB, SI EXISTE LO MUESTRA, SINO  CONSULTA (API -STAR WARS) Y GUARDA */
module.exports.getPlanet = async (event, context, callback) => {  
  try {
    const idPlanet = event.pathParameters.id;
    const res = await dynamo.getByID(idPlanet, postsTablePlanet);
    if(!res || !res.Item) return callback(null, responses._200({msm: 'Not found'}));
    return callback(null, responses._200(res.Item));
  } catch (error) {
    return callback(null, responses._500(error))
  }
};

/** REALIZA LA QUERY A DYNAMODB, ACTUALIZA SI EXISTE, SINO NO ACTUALIZA */
module.exports.putPlanet = async (event, context, callback) => {
  try {
    const idPlanet = event.pathParameters.id;
    const dataForm = JSON.parse(event.body)
    const paramName = dataForm.paramName;
    const paramValue = dataForm.paramValue;

    const res = await dynamo.updateItem(idPlanet, postsTablePlanet, paramName, paramValue);
    return callback(null, responses._200({message: 'Update Success'}));
  } catch (error) {
    return callback(null, responses._500(error))
  }
};

/** REALIZA LA QUERY A DYNAMODB, ELIMINA EL REGISTRO */
module.exports.deletePlanet = async (event, context, callback) => {
  try {
    const idPlanet = event.pathParameters.id;
    await dynamo.deleteIten(idPlanet, postsTablePlanet);
    return callback(null, responses._200({message: 'Delete Success'}))
  } catch (error) {
    return callback(null, responses._500(error))
  }
};
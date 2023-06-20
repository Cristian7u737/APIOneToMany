/* Un modelo es una abstracción que representa una tabla en una base de datos */
import { DataTypes } from "sequelize";
import Comment from "./Comment.js";
import db from "../config/db.js";

const Tutorial = db.define(
    // Los atributos del modelo se definen aquí.
    "tb_tutorials",
    {
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    });

Comment.hasMany(Tutorial, { foreignKey: 'id' }) // Comment hasMany Tutorial from id
Tutorial.hasOne(Comment, { foreignKey: 'id' }) // Tutorial hasMany Comment from id
export default Tutorial; // exporta por defecto la constante Tutorial
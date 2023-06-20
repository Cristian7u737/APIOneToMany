
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db.js";
const Comment  = db.define(
  "tb_comments",
  //columnas de las que llevara nuestra tabla
  // Los atributos del modelo se definen aquí.
  {
    name: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.STRING
    }
  },
  /* {
    hooks: {
      // son como triggers de sequelize
      beforeCreate: async function (player) {
        const salt = await bcrypt.genSalt(10); //
        player.password = await bcrypt.hash(player.password, salt);
      },
      beforeUpdate: async function (player) {
        const salt = await bcrypt.genSalt(10); //
        player.password = await bcrypt.hash(player.password, salt);
      },
    },
  } */
); // es como si estuvieramos creando las tablas remotamente

/* Player.prototype.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}; */
/* Player.hasMany( Game, { foreignKey: 'id' } )
Game.hasOne( Player, { foreignKey: 'id' } ) */
export default Comment;// exporta por defecto la constante Comment
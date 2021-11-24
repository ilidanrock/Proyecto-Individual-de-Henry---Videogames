const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,//esto es lo que garantiza que no se va a repetir
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,// este campo no puede quedar en blanco
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type:DataTypes.TEXT,
      allowNull: false,
    },
    released:{
      type:DataTypes.STRING,
      allowNull: true
    },
    rating:{
      type:DataTypes.FLOAT,
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },   
    createdInDb: { //Para hacer un llamado solamente a los juegos que cree en base de datos.
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};

const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('meetup', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    weather: {
      type: DataTypes.TEXT,
      get() {
        const weatherInfo = this.getDataValue('weather');
        return weatherInfo? JSON.parse(weatherInfo): null;
      }
    }
  })
}
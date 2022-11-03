const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    //Nuestro codigo aca abajo
    code: {
      type: DataTypes.STRING (5),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER
    },
    race: {
      type:  DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
      defaultValue: 'Other'
    },
    hp: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    mana: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    data_added: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    }
  }, 
  {
    timestamps: false
  })
}
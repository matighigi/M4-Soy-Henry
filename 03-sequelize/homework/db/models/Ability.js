const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeTuki'
    },
    description: {
        type: DataTypes.TEXT
    },
    mana_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
      unique: 'compositeTuki'
    },
    summary: {
      type: DataTypes.VIRTUAL,
      get(){
        return `${this.name} (${Math.floor(this.mana_cost)} points of mana) - Description: ${this.description}`
      }
    }
  })
}
/*
1. Definimos un modelo
	
const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  }
});
​
2. sincronizar la DB
	
await sequelize.sync({ force: true });
​
3. Insertamos los datos
​
const jane = await User.create({ name: "Jane" });
​
4. Actualizamos datos
	
const jane = await User.create({ name: "Jane" });
jane.name = "Ada";
await jane.save();
​
    Borramos datos
	
const jane = await User.create({ name: "Jane" });
await jane.destroy();
​
5. Si queremos leer los datos de la tabla
	
const instancias = await Model.findAll();
​
6.Buscar datos de la tabla
	
const [instance, created] = await Model.findOrCreate({
 where: { name: 'Goku' },
 defaults: {
   gender: 'M',
   race: 'Saiyan'
 }
});

​
*/

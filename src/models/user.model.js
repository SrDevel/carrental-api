const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user'
});

module.exports = User;

// (async () => {
//     try {
//         await sequelize.sync({ force: true });
//         console.log('Modelo User sincronizado');
//     } catch (error) {
//         console.error(error);
//         console.warn('Error al sincronizar el modelo User');
//     }
// })();
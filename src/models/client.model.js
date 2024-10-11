const { Model, DataTypes} = require('sequelize');
const sequelize = require('../db/database');

class Client extends Model { }

Client.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{sequelize, modelName: 'client'}
);

// (async () => {
//     try {
//         await sequelize.sync({ force: true });
//         console.log('Modelo Client sincronizado');
//     } catch (error) {
//         console.error(error);
//         console.warn('Error al sincronizar el modelo Client');
//     }
// })();

module.exports = Client;


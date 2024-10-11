const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const Office = require("./office.model");
const Client = require("./client.model");
const Vehicle = require("./vehicle.model");

class Rental extends Model {}

Rental.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    client_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    vehicle_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    office_id: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, { sequelize, modelName: 'rental' });



Rental.belongsTo(Client);
Client.hasMany(Rental);

Rental.belongsTo(Vehicle);
Vehicle.hasMany(Rental);

Rental.belongsTo(Office);
Office.hasMany(Rental);

module.exports = Rental;
//
// (async () => {
//     try {
//         await sequelize.sync({ force: true });
//         console.log('Modelo Rental sincronizado');
//     } catch (error) {
//         console.error(error);
//         console.warn('Error al sincronizar el modelo Rental');
//     }
// })();
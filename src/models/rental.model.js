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



Rental.belongsTo(Client, { foreignKey: 'client_id' });
Client.hasMany(Rental, { foreignKey: 'client_id' });

Rental.belongsTo(Vehicle, { foreignKey: 'vehicle_id' });
Vehicle.hasMany(Rental, { foreignKey: 'vehicle_id' });

Rental.belongsTo(Office, { foreignKey: 'office_id' });
Office.hasMany(Rental, { foreignKey: 'office_id' });


module.exports = Rental;

// (async () => {
//     try {
//         await Rental.sync({ alter: true }); // Solo sincroniza la tabla Rental
//         console.log('Modelo Rental actualizado sin eliminar otros datos.');
//     } catch (error) {
//         console.error('Error al actualizar el modelo Rental:', error);
//     }
// })();

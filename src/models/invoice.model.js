const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const Rental = require('./rental.model');

class Invoice extends Model {}

Invoice.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    rental_id: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, { sequelize, modelName: 'invoice' });

Invoice.belongsTo(Rental);
Rental.hasOne(Invoice);

module.exports = Invoice;

// (async () => {
//     try {
//         await sequelize.sync({ force: true });
//         console.log('Modelo Invoice sincronizado');
//     } catch (error) {
//         console.error(error);
//         console.warn('Error al sincronizar el modelo Invoice');
//     }
// })();
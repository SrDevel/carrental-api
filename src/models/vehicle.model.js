const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const Office = require("./office.model");

class Vehicle extends Model {}

Vehicle.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    transmission: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fuel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    doors: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    passengers: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    luggage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    officeId: {
        type: DataTypes.UUID,
        references: {
            model: Office,
            key: 'id'
        }
    }
}, { sequelize, modelName: 'vehicles' });

Vehicle.belongsTo(Office);
Office.hasMany(Vehicle);

module.exports = Vehicle;

// (async () => {
//     try {
//         await sequelize.sync({ force: true });
//         console.log('Modelo User sincronizado');
//     } catch (error) {
//         console.error(error);
//         console.warn('Error al sincronizar el modelo Vehicle');
//     }
// })();
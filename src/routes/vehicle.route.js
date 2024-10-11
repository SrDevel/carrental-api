const express = require('express');
const router = express.Router();
const vehicle = require('../models/vehicle.model');
const { verifyToken } = require('../security/jwt.config');

router.use(express.json());

const getVehicle = async (req, res, next) => {
    let vehicle;
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'El id es requerido' });

    try {
        vehicle = await vehicle.findOne({
            where: { id }
        })

        if (!vehicle) return res.status(404).json({ message: 'Vehículo no encontrado' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

    res.vehicle = vehicle;
    next();
}

router.get('/', async (req, res) => {
    try {
        const vehicles = await vehicle.findAll();
        if (vehicles.length === 0) return res.status(404).json({message: 'No hay vehículos'});
        res.status(200).json(vehicles);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', getVehicle, async (req, res) => {
    res.status(200).json(res.vehicle);
});

router.post('/', async (req, res) => {
    const { body } = req;

    try {
        const newVehicle = await vehicle.create(body);
        res.status(201).json(newVehicle);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

module.exports = router;




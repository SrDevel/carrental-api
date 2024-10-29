const express = require('express');
const router = express.Router();
const vehicle = require('../models/vehicle.model');
const upload = require('../utils/fileUpload.util');


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

router.post('/', upload.single('image'), async (req, res) => {
    const { body } = req;

    try {
        if (req.file) {
            // Cloudinary devuelve un objeto con la URL de la imagen
            body.image = req.file.path; // La URL pública de la imagen en Cloudinary
        }

        const newVehicle = await vehicle.create(body);
        res.status(201).json(newVehicle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Obtener vehiculos disponibles según la oficina
router.get('/available/:officeId', async (req, res) => {
    const { officeId } = req.params;

    try {
        const vehicles = await vehicle.findAll({
            where: { officeId, status: 'Disponible' }
        });

        if (vehicles.length === 0) return res.status(404).json({ message: 'No hay vehículos disponibles en esta oficina' });

        res.status(200).json(vehicles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;




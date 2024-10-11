const express = require('express');
const router = express.Router();
const rental = require('../models/rental.model');
const { verifyToken } = require('../security/jwt.config');

router.use(express.json());

const getRental = async (req, res, next) => {
    let rental;
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'El id es requerido' });

    try {
        rental = await rental.findOne({
            where: { id }
        })

        if (!rental) return res.status(404).json({ message: 'Alquiler no encontrado' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

    res.rental = rental;
    next();
}

router.get('/', async (req, res) => {
    try {
        const rentals = await rental.findAll();
        if (rentals.length === 0) return res.status(404).json({message: 'No hay alquileres'});
        res.status(200).json(rentals);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', getRental, async (req, res) => {
    res.status(200).json(res.rental);
});

router.post('/', verifyToken, async (req, res) => {
    const { body } = req;

    try {
        const newRental = await rental.create(body);
        res.status(201).json(newRental);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

router.put('/:id', verifyToken, getRental, async (req, res) => {
    const { body } = req;

    try {
        await res.rental.update(body);
        res.status(200).json(res.rental);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const office = require('../models/office.model');
const { verifyToken } = require('../security/jwt.config');

router.use(express.json());

const getOffice = async (req, res, next) => {
    let office;
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'El id es requerido' });

    try {
        office = await office.findOne({
            where: { id }
        })

        if (!office) return res.status(404).json({ message: 'Oficina no encontrada' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

    res.office = office;
    next();
}

router.get('/', async (req, res) => {
    try {
        const offices = await office.findAll();
        if (offices.length === 0) return res.status(404).json({message: 'No hay oficinas'});
        res.status(200).json(offices);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', getOffice, async (req, res) => {
    res.status(200).json(res.office);
});

router.post('/', async (req, res) => {
    const { body } = req;

    try {
        const newOffice = await office.create(body);
        res.status(201).json(newOffice);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

module.exports = router;
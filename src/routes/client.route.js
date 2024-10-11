const express = require('express');
const router = express.Router();
const client = require('../models/client.model');
const { verifyToken } = require('../security/jwt.config');

router.use(express.json());

const getClient = async (req, res, next) => {
    let client;
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'El id es requerido' });

    try {
        client = await client.findOne({
            where: { id }
        })

        if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

    res.client = client;
    next();
}

router.get('/', async (req, res) => {
    try {
        const clients = await client.findAll();
        if (clients.length === 0) return res.status(404).json({message: 'No hay clientes'});
        res.status(200).json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', getClient, async (req, res) => {
    res.status(200).json(res.client);
});

router.post('/', verifyToken, async (req, res) => {
    const { body } = req;

    try {
        const newClient = await client.create(body);
        res.status(201).json(newClient);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

router.put('/:id', verifyToken, getClient, async (req, res) => {
    const { body } = req;

    try {
        await res.client.update(body);
        res.status(200).json(res.client);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

module.exports = router;
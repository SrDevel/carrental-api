const express = require('express');
const router = express.Router();
const invoice = require('../models/invoice.model');
const { verifyToken } = require('../security/jwt.config');

router.use(express.json());

const getInvoice = async (req, res, next) => {
    let invoice;
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'El id es requerido' });

    try {
        invoice = await invoice.findOne({
            where: { id }
        })

        if (!invoice) return res.status(404).json({ message: 'Factura no encontrada' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

    res.invoice = invoice;
    next();
}

router.get('/', async (req, res) => {
    try {
        const invoices = await invoice.findAll();
        if (invoices.length === 0) return res.status(404).json({message: 'No hay facturas'});
        res.status(200).json(invoices);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', getInvoice, async (req, res) => {
    res.status(200).json(res.invoice);
});

router.post('/', verifyToken, async (req, res) => {
    const { body } = req;

    try {
        const newInvoice = await invoice.create(body);
        res.status(201).json(newInvoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

router.put('/:id', verifyToken, getInvoice, async (req, res) => {
    const { body } = req;

    try {
        await res.invoice.update(body);
        res.status(204).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

module.exports = router;
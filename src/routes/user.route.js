const express = require('express');
const router = express.Router();
const user = require('../models/user.model');
const { encrypt, decrypt } = require('../security/password.operations');
const { generateToken, destroyToken } = require('../security/jwt.config');

router.use(express.json());

router.post('/login', async (req, res) => {
    const { body } = req;

    try {
        const userFound = await user.findOne({
            where: { username: body.username }
        });

        if (!userFound) return res.status(404).json({ message: 'Usuario no encontrado' });

        const isPasswordValid = await decrypt(body.password, userFound.password);

        if (!isPasswordValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = generateToken(userFound.id);
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ token: token, message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/signing', async (req, res) => {
    const { body } = req;

    try {
        body.password = await encrypt(body.password);
        const newUser = await user.create(body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/logout', (req, res) => {
    destroyToken(req, res);
});

router.get('/me', async (req, res) => {
    const { token } = req.cookies;

    try {
        const { id } = token;
        const userFound = await user.findByPk(id, { attributes: { exclude: ['password'] } });
        res.status(200).json(userFound);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await user.findAll({ attributes: { exclude: ['password'] } });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
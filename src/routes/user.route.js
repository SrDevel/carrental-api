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
        res.status(200).json({ message: `Inicio de sesión exitoso, token: ${token.toString()}`  });
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

module.exports = router;
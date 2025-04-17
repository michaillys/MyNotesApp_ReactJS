const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'slaptas_tokenas';

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    try {
        db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(username, hashed);
        res.status(201).json({ message: 'Vartotojas sukurtas' });
    } catch {
        res.status(400).json({ error: 'Vartotojas jau egzistuoja' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Neteisingi prisijungimo duomenys' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token });
});

module.exports = router;



/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registruoja naują vartotoją
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vartotojas sėkmingai sukurtas
 *       400:
 *         description: Vartotojas jau egzistuoja arba duomenys neteisingi
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Prisijungti prie sistemos
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Prisijungimas sėkmingas, grąžinamas JWT tokenas
 *       401:
 *         description: Neteisingi prisijungimo duomenys
 */
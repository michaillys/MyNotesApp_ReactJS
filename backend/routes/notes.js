const express = require('express');
const db = require('../db');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.use(auth);

// Gauti užrašus
router.get('/', (req, res) => {
    const notes = db.prepare("SELECT * FROM notes WHERE userId = ?").all(req.userId);
    res.json(notes);
});

// Sukurti
router.post('/', (req, res) => {
    const { title, content, category } = req.body;
    const stmt = db.prepare("INSERT INTO notes (title, content, category, userId) VALUES (?, ?, ?, ?)");
    const result = stmt.run(title, content, category || 'kita', req.userId);
    res.status(201).json({ id: result.lastInsertRowid });
});

// Atnaujinti
router.put('/:id', (req, res) => {
    const { title, content, category } = req.body;
    const stmt = db.prepare("UPDATE notes SET title = ?, content = ?, category = ? WHERE id = ? AND userId = ?");
    const result = stmt.run(title, content, category, req.params.id, req.userId);
    result.changes
        ? res.json({ message: 'Atnaujinta' })
        : res.status(404).json({ error: 'Nerasta' });
});

// Ištrinti
router.delete('/:id', (req, res) => {
    const stmt = db.prepare("DELETE FROM notes WHERE id = ? AND userId = ?");
    const result = stmt.run(req.params.id, req.userId);
    result.changes
        ? res.json({ message: 'Ištrinta' })
        : res.status(404).json({ error: 'Nerasta' });
});

module.exports = router;


/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Gauti visus prisijungusio vartotojo užrašus
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Užrašų sąrašas
 *       401:
 *         description: Neautorizuota
 */


/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Sukurti naują užrašą
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Užrašas sukurtas
 *       401:
 *         description: Neautorizuota
 */


/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Atnaujinti užrašą pagal ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Užrašo ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Užrašas atnaujintas
 *       404:
 *         description: Užrašas nerastas
 */


/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Ištrinti užrašą pagal ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Užrašo ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Užrašas ištrintas
 *       404:
 *         description: Užrašas nerastas
 */

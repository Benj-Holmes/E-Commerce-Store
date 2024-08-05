const {Router} = require("express");
const router = Router();
const pool = require("../config/db");
const bcrypt = require('bcrypt');

// Test Route to get ALL Users from DB
router.get('/all', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
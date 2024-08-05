const { Router } = require('express');
const pool = require('../config/db');
const router = Router();

//Gets All Products
const getProducts = (req, res) => {
    pool.query("SELECT * FROM products", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

//Gets 8 Random Products to Populate Discover Section
const getRandProducts = (req, res) => {
    const p1 = Math.floor(Math.random() * 60);
    const p2 = Math.floor(Math.random() * 60);
    const p3 = Math.floor(Math.random() * 60);
    const p4 = Math.floor(Math.random() * 60);
    const p5 = Math.floor(Math.random() * 60);
    const p6 = Math.floor(Math.random() * 60);
    const p7 = Math.floor(Math.random() * 60);
    const p8 = Math.floor(Math.random() * 60);
    pool.query(`SELECT * FROM products WHERE id = $1 OR id = $2 OR id = $3 OR id = $4
    OR id = $5 OR id = $6 OR id = $7 OR id = $8`,
     [p1, p2, p3, p4, p5, p6, p7, p8], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

router.get('/', getProducts);
router.get('/discover', getRandProducts);

module.exports = router;
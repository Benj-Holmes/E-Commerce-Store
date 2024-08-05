const { Router } = require('express');
const pool = require('../config/db');
const router = Router();


//Route which receives all reviews relating to the given product id.
const getReviews = (req, res) => {
    const id = req.params.id;
    // console.log(id);
    pool.query("SELECT * FROM reviews WHERE product_id = $1 LIMIT 4", [id] 
    , (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

router.get('/:id', getReviews);

module.exports = router;
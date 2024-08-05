const { Router } = require('express');
const pool = require('../config/db');
const router = Router();


// Creates a new Order record based on the items in a completed cart
const createOrder = async (req, res) => {
    console.log(req.user);
    const userId = parseInt(req.user.id);
    
    if(!userId){
        res.status(500).send("Invalid ID")
    }

    pool.query(`SELECT * FROM cart WHERE user_id = $1 AND is_current_cart = true`,
    [userId],
    (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            const cartId = results.rows[0].id;
            pool.query(`INSERT INTO orders (user_id, cart_id, complete, completed_at)
            VALUES ($1, $2, true, NOW()::timestamp)`,
            [userId, cartId],
            (error, results) => {
                if (error) throw error;
                res.status(201).send("Order Created Successfully")
            })
        }
    })
}

const getMembersOrders = (req, res) => {
    const userId = parseInt(req.user.id);
    pool.query(`SELECT * FROM orders WHERE user_id = $1`,
    [userId],
    (error, results) => {
        if (error) throw error;
        res.send(results.rows);
    })
}

const getOrderItems = (req, res) => {
    const orderId = req.params.id;
    pool.query(`SELECT * FROM orders
    JOIN cart_item ON orders.cart_id = cart_item.cart_id
    JOIN products ON cart_item.product_id = products.id
    WHERE orders.id = $1`, [orderId],
    (error, results) => {
        if (error) throw error;
        res.send(results.rows);
    })
}





router.post('/', createOrder);
router.get('/', getMembersOrders);
router.get('/:id', getOrderItems);


module.exports = router;
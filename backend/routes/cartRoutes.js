const { Router } = require('express');
const pool = require('../config/db');
const router = Router();

// Check if a user has a cart, and if not, creates one
const checkCreateCart = (req, res) => {
    // We need this block to check for a user, otherwise we get an error if it is undefined
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'User is not authenticated' });
    }
    const userId = req.user.id;
    if (req.user) {
    pool.query(`SELECT * FROM cart WHERE user_id = $1 AND is_current_cart = true`, 
    [userId],
    (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            const cartId = results.rows[0].id;
            res.send(cartId);    
        } else {
            pool.query(`INSERT INTO cart (is_current_cart, user_id)
            VALUES (true, $1)`, [userId],
            (error, results) => {
                if (error) throw error;
                res.status(201).send('New Cart Created for User');
            })
        }
    })
    }
}

// Get all of a specific users cart items.
const getCartItems = (req, res) => {
    // We need this block to check for a user, otherwise we get an error if it is undefined
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'User is not authenticated' });
    }
    const userId = req.user.id;
    if (req.user) {
    pool.query(`SELECT * FROM cart WHERE user_id = $1 AND is_current_cart = true`,
    [userId],
    (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            const cartId = results.rows[0].id;
            pool.query(`SELECT * FROM cart_item
            JOIN cart ON cart_item.cart_id = cart.id
            JOIN products ON cart_item.product_id = products.id
            WHERE cart_id = $1`, [cartId],
            (error, results) => {
                if (error) throw error;
                if (results.rows) {
                    res.send(results.rows);
                }
            })
        }
    })
    } else {
        res.send('User Not Logged In, so No Cart Retreived');
    }         
}

//Add item to Cart
const addItemToCart = (req, res) => {
    const user_id = req.user.id;
    const { product_id, quantity, item_size } = req.body;
    pool.query(`SELECT * FROM cart WHERE user_id = $1 AND is_current_cart = true`,
    [user_id],
    (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            const cartId = results.rows[0].id;
            pool.query(`INSERT INTO cart_item (product_id, cart_id, quantity, item_size)
            VALUES ($1, $2, $3, $4)`,
            [product_id, cartId, quantity, item_size],
            (error, results) => {
                if (error) throw error;
                res.status(201).send('Item Added to Cart');
            })
        }
    })
}

// Once a checkout is complete we set a cart to inactive, so that we can still use it's contents to see 
// What the user has previously ordered.
const setCartInactive = (req, res) => {
    const userId = req.user.id;
    pool.query(`SELECT * FROM cart WHERE user_id = $1 AND is_current_cart = true`,
    [userId],
    (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            const cartId = results.rows[0].id;
            pool.query(`UPDATE cart SET is_current_cart = false WHERE id = $1`,
            [cartId],
            (error, results) => {
                if (error) throw error;
                res.status(200).send("Cart Successfully set to Inactive");
            })
}
    })
}

const deleteItemFromCart = (req, res) => {
    const user_id = req.user.id;
    const product_id = parseInt(req.params.id);
    pool.query(`SELECT * FROM cart WHERE user_id = $1 AND is_current_cart = true`,
    [user_id],
    (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            const cartId = results.rows[0].id; 
            pool.query(`DELETE FROM cart_item WHERE product_id = $1 AND cart_id = $2`,
            [product_id, cartId],
            (error, results) => {
                if (error) throw error;
                res.status(204).send("Cart Item Deleted Successfully");
            })
        }
    })
}

const updateCartQuantity = (req, res) => {
    const { cart_id, product_id, quantity } = req.body;
    pool.query(`UPDATE cart_item
                SET quantity = $1
                WHERE cart_id = $2 AND product_id = $3`, [quantity, cart_id, product_id],
                (error, results) => {
                    if (error) throw error;
                    res.status(200).send("Quantity Updated Successfully");
                });
};

router.delete('/:id', deleteItemFromCart);
router.get('/', checkCreateCart);
router.put('/', setCartInactive);
router.get('/items', getCartItems);
router.post('/', addItemToCart);
router.put('/increment', updateCartQuantity);

module.exports = router;
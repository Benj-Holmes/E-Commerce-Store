const {Router} = require("express");
const router = Router();
const pool = require("../config/db");
const bcrypt = require('bcryptjs');

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

//Add a User Account
const addUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    //Check if Email already exists
    pool.query( "SELECT u FROM users u WHERE u.email = $1", [email],
     (error, results) => {
        if (results.rows.length) {
            res.send("An Account with this Email already exists");
        }
    //Create an Account Record for the User
    pool.query( "INSERT INTO users (first_name, last_name, email, password, created_at) VALUES ($1, $2, $3, $4, NOW()::timestamp)"
    , [first_name, last_name, email, hashedPassword], 
        (error, results) => {
            if (error) throw error;
                res.status(201).send('Successfully Registered, You can now Log In');
                // res.redirect('/')
            });
    })
};

const getUser = async (req, res) => {
    res.send(req.user);
}

router.post('/register', addUser);
router.get('/', getUser);

module.exports = router;
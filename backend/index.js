const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./config/googlePassport');

const app = express();

// Middleware ---------------------------------------------------------------------
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    preflightContinue: true
}));

const store = new session.MemoryStore();
app.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false,
    cookie: {
        sameSite: false,
        secure: false,
        maxAge: 300000000000
    },
    store 
}));

// Passport Config --------------------------------------------------------------------

require('./config/passportConfig');
app.use(passport.initialize());
app.use(passport.session());

// Log In
app.post('/auth/login', passport.authenticate('local'), (req, res, next) => {
    res.send(req.user);
});

// Log Out 
app.get('/auth/logout', (req, res) => {
    req.logOut(() => {
        res.send({ message: 'Logged Out Successfully!'});
    })
})

// Google Login -----------------------------------------------------------------------
require('./config/googlePassport');
app.get('/auth/google', passport.authenticate('google', {
    scope: 'profile',
}), )

app.get('/auth/google/callback', passport.authenticate("google", { session: true }), (req, res) => {
    // Cant Res.send and res.redirect, so i think i have to call getUser after this.
    // res.send(req.user);
    res.redirect('http://localhost:3000/account')
})

// Route Handlers ---------------------------------------------------------------------
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/product', require('./routes/productRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
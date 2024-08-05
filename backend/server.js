const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
// require('./config/passportconfig');
// require('./config/googlepassport');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
// app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// Route Handlers -------------------------------------------
// app.use('/cart', require('./routes/cartRoutes'));
// app.use('/orders', require('./routes/orderRoutes'));
// app.use('/payment', require('./routes/paymentRoutes'));
// app.use('/products', require('./routes/productRoutes'));
// app.use('/reviews', require('./routes/reviewRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
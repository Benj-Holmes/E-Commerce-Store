const bcrypt = require('bcryptjs');
const passport = require('passport');
const pool = require('../config/db');
const localStrategy = require('passport-local').Strategy;


const verifyCallback = (email, password, done) => {
    pool.query(`SELECT * FROM users WHERE email = $1`, [email],
    (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length > 0) {
            const user = results.rows[0];
            bcrypt.compare(password, user.password, (error, isMatch) => {
                if (error) {
                  throw error;
                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Password Incorrect"});
                }
            })
        } else {
            return done(null, false, {message: "This User Was Not Found"})
        }
    }
);
};

const strategy = new localStrategy(
    {usernameField: "email", passwordField: "password"}, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    pool.query(
        'SELECT * FROM users WHERE id = $1', [id], (error, results) => {
            if (error) {
                return done(error);
            }
            return done(null, results.rows[0]);
        });
    });
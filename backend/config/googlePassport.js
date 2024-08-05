const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('./db');
require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        const account = profile._json;
        console.log(account);
        let user = {};
        try {
            const currentUser = await pool.query(`SELECT * FROM users WHERE google_id = $1`, [account.sub]);
            if (currentUser.rows.length === 0) {
                // Create User
                await pool.query(`INSERT INTO users (first_name, last_name, created_at, google_id)
                VALUES ($1, $2, NOW()::timestamp, $3)`, [account.given_name, account.last_name, account.sub]);

                const id = await pool.query("SELECT id FROM users where google_id = $1", [account.sub]);
                user = {
                    id: id.rows[0].id,
                    first_name: account.given_name,
                }
            } else {
                // User Exists Already
                user = {
                    id: currentUser.rows[0].id,
                    first_name: currentUser.rows[0].first_name,
                }
            }
            done(null, user);
        } catch (error) {
            done(error);
        }
    })
);

// serialize stores into req.session.passport.user
passport.serializeUser((user, done) => done(null, user.id));
// deserialize stores the result of the function into req.user
passport.deserializeUser((id, done) => {
    pool.query(
        'SELECT * FROM users WHERE id = $1', [id], (error, results) => {
            if (error) {
                return done(error);
            }
            return done(null, results.rows[0]);
        });
    });
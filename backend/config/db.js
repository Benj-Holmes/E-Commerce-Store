const Pool = require('pg').Pool;
require("dotenv").config();

const pool = new Pool({
    user: "postgres",
    host: "aws-0-us-east-1.pooler.supabase.com",
    database: "eCommerce",
    password: process.env.DB_PASSWORD,
    port: 5432
});

module.exports = pool;
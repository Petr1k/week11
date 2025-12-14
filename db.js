const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg');

const itemsPool = new Pool({
  connectionString: process.env.DBConnectionString,
  ssl: { rejectUnauthorized: false }  


});


//   user: 'postgres',
//   password: 'admin',
//   host: 'localhost',
//   port: 5432,   
//   database: 'myrecipes'
// });

module.exports = itemsPool;

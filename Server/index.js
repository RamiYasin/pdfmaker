const express = require("express"); // standared
const app = express(); // standared
const router = require('./rauter/router');
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//const db = require("mysql2");
app.use(router);
app.set('view engine', 'ejs');
//app.use(express.static(__dirname + '/public')); // Make sure your CSS file is in a "public" directory

// ... Define your routes and other middleware ...

// create connection to MySQL database
/*const connection = db.createConnection(
    {
        host: '0.0.0.0',           // your host
        user: 'ob',               // your user           // that is a config file
        password: '123',         // your pass
        database: 'pdfdb',
        port: '3307'        // your schema
    }
);*/

// connect to MySQL database
/*connection.connect((err) => {            // to creat a connection to db
    if (err) {
        console.log(err);
        return;
    }
    console.log("Connected to the database")
});*/

// to import all users

/*app.get('/users', (req, res) => {
    const sql = "SELECT * FROM mosta5dem;"
    connection.query(sql, (err, result) => {      // result is the raw data from db
        if (err) {
            console.log(err);
            return;
        }
        res.status(200).json(result);    // res is the way how to respone the data
    });
});*/

// Load environment variables from a .env file (if you're using dotenv)


// Create a MySQL connection pool
/*const pool = db.createPool({
  connectionLimit: 10, // Adjust this as needed
  host: '0.0.0.0',      // This should match the service name in your Docker Compose file
  user: 'ob',
  password: '123',
  database: 'pdfdb',
  port: '3307'
});*/

/*pool.getConnection((err, connection) => {
    if (err) {
      console.error('Failed to connect to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
    connection.release(); // Release the connection when done
  });
  
  // Handle any errors that occur during the connection process
  pool.on('error', (err) => {
    console.error('MySQL pool error:', err);
  });*/


app.listen(3000, () => {
    console.log("server is running")

})

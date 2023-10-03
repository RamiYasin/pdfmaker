
const db = require("mysql2");

    
    const connection = db.createConnection(
        {
            host: '0.0.0.0',           // your host
            user: 'ob',               // your user           // that is a config file
            password: '123',         // your pass
            database: 'pdfdb',
            port: '3307'        // your schema
        }
    );
    
    // connect to MySQL database
    connection.connect((err) => {            // to creat a connection to db
        if (err) {
            console.log(err);
            return;
        }
        console.log("Connected to the database")
    });


module.exports = connection;
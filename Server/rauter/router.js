const express = require('express');
const con = require('../dbcon/dbcon')
const generatePDF = require('./genepdf')

const router = express.Router();

router.get('/welcome', async (req, res) => {
  try {
    const sql = "SELECT * FROM File;"
    con.query(sql, (err, result) => {      // result is the raw data from db
      if (err) {
        console.log(err);
        return;
      }
      //res.status(200).json(result);
      res.render('Listdata', { result });    // res is the way how to respone the data
    }); // Fetch all products from the database
    // Render the EJS view with the retrieved data
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/printpdf/:idd', async (req, res) => {
  try {
    const id = req.params.idd;
    const sql = "SELECT File.FileID, File.Filename, Par.ParID, Par.Title, Par.Description, Par.Time FROM File LEFT JOIN Par ON File.FileID = Par.FileID WHERE File.FileID = ?;"
    con.query(sql, [id], (err, result) => {      // result is the raw data from db
      if (err) {
        console.log(err);
        return;
      }
      console.log(result);
      res.render('pdfview', { result });    // res is the way how to respone the data
    }); // Fetch all products from the database
    // Render the EJS view with the retrieved data
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
 // res.render('pdfview');
});

router.get('/generate-pdf/:idd', async (req, res) => {
  try {
    const li = req.params.idd;
    const pdfBuffer = await generatePDF(li); // Function to generate PDF
    res.contentType('application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="yourfile.pdf"');
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating PDF');
  }
});

router.get('/eventform/:idd', async (req, res) => {
  const id = req.params.idd; // Get the id from the URL
  const sql = 'SELECT * FROM Par WHERE FileID = ?';
  
  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    if (result.length === 0) {

      
      res.render('AddDataNew', { id});
      return;
    }
    
    // Render the 'AddData' EJS view with the retrieved data
   
  });
});


router.post('/pdfadd', (req, res) => {

  //const {Filename, Datepdf} = req.body;


  const Filename = req.body.Filename;
  const Datepdf = req.body.Datepdf;




  const sql = 'INSERT INTO File (filename, Datepdf) VALUES (?,?)'; //sql query with parameters
  con.query(sql, [Filename, Datepdf], (err, result) => {      //add the parameters as a array
    if (err) {
      console.log(err);
      return;
    }
    res.status(200).json(result);    // res is the way how to respone the data
  });

});

router.post('/praad', (req, res) => {

  //const {Filename, Datepdf} = req.body;


  const Fileid = req.body.Fileid;
  const Time = req.body.Time;
  const Description = req.body.Description;
  const Title = req.body.Title;




  const sql = 'INSERT INTO Par (FileID, Time, Description, Title ) VALUES (?,?,?,?)'; //sql query with parameters
  con.query(sql, [Fileid, Time, Description, Title ], (err, result) => {      //add the parameters as a array
    if (err) {
      console.log(err);
      return;
    }
    res.status(200).json(result);    // res is the way how to respone the data
  });

});

module.exports = router;
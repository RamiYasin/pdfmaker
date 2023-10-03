const puppeteer = require('puppeteer');

async function generatePDF( url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Visit the URL where your EJS view is rendered
  await page.goto('http://localhost:3000/printpdf/'+url, { waitUntil: 'networkidle0' });

  // Generate PDF
  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();
  return pdfBuffer;
}

module.exports = generatePDF;
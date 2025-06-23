
const fs = require('fs');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fetch = require('node-fetch');

async function generatePDF() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const logoImageBytes = fs.readFileSync('./akuabadatabg.jpg');
  const logoImage = await pdfDoc.embedJpg(logoImageBytes);
  const logoDims = logoImage.scale(0.3);

  // Draw logo only on first page
  page.drawImage(logoImage, {
    x: 50,
    y: 760,
    width: logoDims.width,
    height: logoDims.height,
  });

  const fields = [
    'Vendor Company Name',
    'Product Code',
    'Vendor Code',
    'Country of Origin',
    'Product Description',
    'Max Stock Quantity',
    'Shipping Required',
    'WhatsApp',
    'Email',
    'Phone Number',
    'Website',
    'Social Media Links',
    'Currency Code',
    'Unit Price',
    'Estimated Delivery Time (Days)',
    'Vendor TIN',
    'Trade Documents Available',
    'Buyer Countries Allowed',
    'Transport Modes',
    'Payment Terms',
    'Product Unit',
    'Rules of Origin Compliant',
    'Min Quantity Allowed',
    'Max Quantity Allowed',
    'HS Code',
    'AfCFTA Tariff Rate',
    'AfCFTA Eligible',
    'Regulatory Certifications',
    'Supported Languages',
    'Available Ports',
    'AfCFTA ID',
  ];

  let y = 700;
  const lineHeight = 22;

  fields.forEach((field, i) => {
    if (y < 100) {
      y = 760;
      const newPage = pdfDoc.addPage([595.28, 841.89]);
      newPage.setFont(font);
      page = newPage;
    }
    page.drawText(`${field}: __________________________________________`, {
      x: 50,
      y,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });
    y -= lineHeight;
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('./AfCFTA_Corporate_Form.pdf', pdfBytes);
  console.log('✅ PDF created: AfCFTA_Corporate_Form.pdf');
}

generatePDF();

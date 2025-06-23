
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const generateAfCFTACorporateForm = async () => {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595.28, 841.89]); // A4 size

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Fetch logo image as bytes
  const logoUrl = '/akuabadatabg.jpg'; // place this in `public/` folder
  const logoBytes = await fetch(logoUrl).then(res => res.arrayBuffer());
  const logoImage = await pdfDoc.embedJpg(logoBytes);
  const logoDims = logoImage.scale(0.3);

  page.drawImage(logoImage, {
    x: 50,
    y: 760,
    width: logoDims.width,
    height: logoDims.height,
  });

  const fields = [
    'Vendor Company Name', 'Product Code', 'Vendor Code', 'Country of Origin', 'Product Description',
    'Max Stock Quantity', 'Shipping Required', 'WhatsApp', 'Email', 'Phone Number', 'Website',
    'Social Media Links', 'Currency Code', 'Unit Price', 'Estimated Delivery Time (Days)', 'Vendor TIN',
    'Trade Documents Available', 'Buyer Countries Allowed', 'Transport Modes', 'Payment Terms',
    'Product Unit', 'Rules of Origin Compliant', 'Min Quantity Allowed', 'Max Quantity Allowed',
    'HS Code', 'AfCFTA Tariff Rate', 'AfCFTA Eligible', 'Regulatory Certifications',
    'Supported Languages', 'Available Ports', 'AfCFTA ID',
  ];

  let y = 700;
  const lineHeight = 22;

  for (let field of fields) {
    if (y < 100) {
      page = pdfDoc.addPage([595.28, 841.89]);
      y = 760;
    }
    page.drawText(`${field}: __________________________________________`, {
      x: 50,
      y,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });
    y -= lineHeight;
  }

  const pdfBytes = await pdfDoc.save();

  // Trigger download
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'AfCFTA_Corporate_Form.pdf';
  link.click();
};
export const generateProductSummaryPDF = async (product: any) => {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595.28, 841.89]); // A4

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  let y = 780;

  // Draw title
  page.drawText('AfCFTA Product Summary Report', {
    x: 50,
    y,
    size: 16,
    font,
    color: rgb(0, 0.2, 0.6),
  });

  y -= 30;

  const entries = Object.entries(product);
  for (const [key, value] of entries) {
    if (y < 50) {
      page = pdfDoc.addPage([595.28, 841.89]);
      y = 780;
    }

    const formattedValue = Array.isArray(value)
      ? value.join(', ')
      : typeof value === 'object' && value !== null
      ? JSON.stringify(value)
      : String(value ?? '');

    page.drawText(`${key}: ${formattedValue}`, {
      x: 50,
      y,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 20;
  }

  const pdfBytes = await pdfDoc.save();

  // Trigger download
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${product.productCode}_Summary.pdf`;
  link.click();
};


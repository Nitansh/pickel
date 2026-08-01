import fs from 'fs';
import PDFDocument from 'pdfkit';

const doc = new PDFDocument({ margin: 40, size: 'A4' });

doc.pipe(fs.createWriteStream('public/pickel_brochure.pdf'));
doc.pipe(fs.createWriteStream('pickel_brochure.pdf'));

// Colors
const primary = '#991b1b';
const accent = '#d97706';
const dark = '#1c1917';

// Header
doc.fillColor(primary).fontSize(32).font('Helvetica-Bold').text('PICKEL.', { align: 'center' });
doc.fillColor('#78716c').fontSize(11).font('Helvetica').text('HANDCRAFTED ARTISANAL GOURMET PICKLES', { align: 'center' });
doc.moveDown(0.5);

doc.fillColor(accent).fontSize(10).font('Helvetica-Bold').text('☀️ 100% Sun-Dried   •   🛡️ Zero Preservatives   •   🪔 Cold-Pressed Oils', { align: 'center' });
doc.moveDown(1.5);

// Title
doc.fillColor(primary).fontSize(16).font('Helvetica-Bold').text('🌶️ SIGNATURE PICKLES CATALOG', { underline: true });
doc.moveDown(0.8);

// Product 1
doc.fillColor(dark).fontSize(13).font('Helvetica-Bold').text('1. Grandma’s Avakaya Raw Mango (Aged 45 Days)');
doc.fillColor('#78716c').fontSize(9.5).font('Helvetica').text('Andhra Raw Mangoes in Cold-Pressed Mustard Oil & Crushed Guntur Chilies');
doc.fillColor(accent).fontSize(10).font('Helvetica-Bold').text('Price: 250g: ₹349  |  500g: ₹629  |  1kg: ₹1,149');
doc.moveDown(1);

// Product 2
doc.fillColor(dark).fontSize(13).font('Helvetica-Bold').text('2. Vintage 2-Year Aged Sweet Lemon (Aged 730 Days)');
doc.fillColor('#78716c').fontSize(9.5).font('Helvetica').text('Sun-Matured in Terracotta Barnis with Organic Jaggery & Black Salt (Zero Oil)');
doc.fillColor(accent).fontSize(10).font('Helvetica-Bold').text('Price: 250g: ₹299  |  500g: ₹549  |  1kg: ₹999');
doc.moveDown(1);

// Product 3
doc.fillColor(dark).fontSize(13).font('Helvetica-Bold').text('3. Fiery Green Chili & Mustard (Aged 30 Days)');
doc.fillColor('#78716c').fontSize(9.5).font('Helvetica').text('Split Green Chilies Stuffed with Coarse Yellow Mustard & Turmeric');
doc.fillColor(accent).fontSize(10).font('Helvetica-Bold').text('Price: 250g: ₹279  |  500g: ₹499  |  1kg: ₹899');
doc.moveDown(1);

// Product 4
doc.fillColor(dark).fontSize(13).font('Helvetica-Bold').text('4. Stuffed Benarasi Red Chili (Aged 50 Days)');
doc.fillColor('#78716c').fontSize(9.5).font('Helvetica').text('Thick Benarasi Red Peppers Stuffed with 12 Heritage Roasted Spices');
doc.fillColor(accent).fontSize(10).font('Helvetica-Bold').text('Price: 250g: ₹389  |  500g: ₹699  |  1kg: ₹1,249');
doc.moveDown(1.5);

// Custom Jar Section
doc.fillColor(primary).fontSize(14).font('Helvetica-Bold').text('🧪 BUILD YOUR OWN CUSTOM PICKLE JAR SERVICE');
doc.fillColor(dark).fontSize(9.5).font('Helvetica').text('Pick your fruit/veggie base + spice mix + cold-pressed oil + heat level + custom printed name label!');
doc.fillColor(accent).fontSize(10).font('Helvetica-Bold').text('Custom Jar Starting at ₹349');
doc.moveDown(1.5);

// Contact Box
doc.rect(40, doc.y, 515, 110).fillAndStroke('#faf8f5', primary);
doc.moveDown(0.5);

doc.fillColor(primary).fontSize(14).font('Helvetica-Bold').text('📞 OFFLINE ORDERS & HELPLINE SUPPORT', { align: 'center' });
doc.fillColor(dark).fontSize(18).font('Helvetica-Bold').text('+91 9034716744', { align: 'center' });
doc.fillColor('#78716c').fontSize(9).font('Helvetica').text('Call / WhatsApp for instant phone orders, wedding return gifts & corporate bulk hampers!', { align: 'center' });
doc.fillColor(accent).fontSize(9.5).font('Helvetica-Bold').text('Website: https://pickel.vercel.app   |   UPI ID: 9034716744@ybl', { align: 'center' });

doc.end();
console.log('PDF brochure generated successfully!');

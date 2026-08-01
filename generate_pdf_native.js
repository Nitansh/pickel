import fs from 'fs';

function buildPdfBinary() {
  const contentText = `
%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
6 0 obj
<< /Length 1250 >>
stream
BT
/F1 26 Tf
1 0 0 1 50 780 Tm
(PICKEL - ARTISANAL GOURMET PICKLES) Tj
/F2 10 Tf
1 0 0 1 50 760 Tm
(Sun-Dried in Terracotta Barnis | 100% Preservative Free | Cold-Pressed Oils) Tj
1 0 0 1 50 740 Tm
(____________________________________________________________________________) Tj

/F1 16 Tf
1 0 0 1 50 705 Tm
(OFFLINE CLIENT PRODUCT BROCHURE & PRICE LIST) Tj

/F1 12 Tf
1 0 0 1 50 670 Tm
(1. Grandma's Avakaya Raw Mango Pickle (Aged 45 Days)) Tj
/F2 10 Tf
1 0 0 1 65 655 Tm
(Andhra Raw Mangoes in Cold-Pressed Mustard Oil & Guntur Chilies) Tj
/F1 10 Tf
1 0 0 1 65 640 Tm
(Price: 250g: Rs 349  |  500g: Rs 629  |  1kg: Rs 1,149) Tj

/F1 12 Tf
1 0 0 1 50 605 Tm
(2. Vintage 2-Year Aged Sweet Lemon Pickle (Aged 730 Days)) Tj
/F2 10 Tf
1 0 0 1 65 590 Tm
(Sun-Matured in Terracotta with Organic Jaggery & Black Salt (Zero Oil)) Tj
/F1 10 Tf
1 0 0 1 65 575 Tm
(Price: 250g: Rs 299  |  500g: Rs 549  |  1kg: Rs 999) Tj

/F1 12 Tf
1 0 0 1 50 540 Tm
(3. Fiery Green Chili & Mustard Pickle (Aged 30 Days)) Tj
/F2 10 Tf
1 0 0 1 65 525 Tm
(Split Green Chilies Stuffed with Coarse Yellow Mustard & Turmeric) Tj
/F1 10 Tf
1 0 0 1 65 510 Tm
(Price: 250g: Rs 279  |  500g: Rs 499  |  1kg: Rs 899) Tj

/F1 12 Tf
1 0 0 1 50 475 Tm
(4. Stuffed Benarasi Red Chili Pickle (Aged 50 Days)) Tj
/F2 10 Tf
1 0 0 1 65 460 Tm
(Thick Benarasi Red Peppers Stuffed with 12 Heritage Roasted Spices) Tj
/F1 10 Tf
1 0 0 1 65 445 Tm
(Price: 250g: Rs 389  |  500g: Rs 699  |  1kg: Rs 1,249) Tj

/F1 13 Tf
1 0 0 1 50 400 Tm
(BUILD YOUR OWN CUSTOM PICKLE JAR SERVICE) Tj
/F2 10 Tf
1 0 0 1 50 385 Tm
(Select Base + Spice Mix + Oil + Heat Level + Custom Printed Name Label!) Tj
/F1 10 Tf
1 0 0 1 50 370 Tm
(Custom Jar Starting at Rs 349 (250g)) Tj

1 0 0 1 50 340 Tm
(____________________________________________________________________________) Tj

/F1 14 Tf
1 0 0 1 50 305 Tm
(CUSTOMER HELPLINE & PHONE ORDER SUPPORT) Tj
/F1 18 Tf
1 0 0 1 50 280 Tm
(Helpline / WhatsApp: +91 9034716744) Tj
/F2 10 Tf
1 0 0 1 50 260 Tm
(Call for instant phone orders, wedding hampers & corporate gifting!) Tj
1 0 0 1 50 245 Tm
(Website: https://pickel.vercel.app   |   Instant UPI: 9034716744@ybl) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000056 00000 n 
0000000111 00000 n 
0000000251 00000 n 
0000000326 00000 n 
0000000397 00000 n 
trailer
<< /Size 7 /Root 1 0 R >>
startxref
1700
%%EOF
`;

  fs.writeFileSync('public/pickel_brochure.pdf', contentText.trim());
  fs.writeFileSync('pickel_brochure.pdf', contentText.trim());
  console.log('Native PDF generated successfully at public/pickel_brochure.pdf and pickel_brochure.pdf!');
}

buildPdfBinary();

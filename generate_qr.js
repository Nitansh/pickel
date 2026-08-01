import fs from 'fs';
import https from 'https';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const websiteUrl = 'https://pickel.vercel.app';
const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(websiteUrl)}&margin=10&color=991b1b&bgcolor=faf8f5`;

const fileStream = fs.createWriteStream('public/website_qr.png');

https.get(qrApiUrl, (response) => {
  response.pipe(fileStream);
  fileStream.on('finish', () => {
    fileStream.close();
    console.log('Website QR code saved to public/website_qr.png successfully!');
    fs.copyFileSync('public/website_qr.png', 'website_qr.png');
  });
}).on('error', (err) => {
  console.error('Error generating QR code:', err.message);
});

const https = require('https');

const url = 'https://api.azebotdress.com/api/v1/products/?limit=1';

console.log('Testing connection to:', url);

const req = https.get(url, (res) => {
    console.log('Status:', res.statusCode);
    console.log('Headers:', JSON.stringify(res.headers, null, 2));

    res.on('data', () => { }); // Consume data
    res.on('end', () => console.log('Response ended'));
});

req.on('error', (e) => {
    console.error('Connection Error:', e);
});

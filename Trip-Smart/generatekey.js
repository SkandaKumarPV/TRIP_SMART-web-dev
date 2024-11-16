const crypto = require('crypto');

// Generate a 256-bit random string as the secret key
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Generated Secret Key:', secretKey);

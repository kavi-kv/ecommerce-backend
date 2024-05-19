const crypto = require('crypto');

const secret = crypto.randomBytes(64).toString('base64');
console.log("JWT Secret:", secret);

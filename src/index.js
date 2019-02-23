require('dotenv').config();


console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`NODE_ENV: ${process.env["ENV"]}`);

// gera config/development.json, prod
// requirea þá hingað inn eftir umhverfi ofc
// https://www.npmjs.com/package/config
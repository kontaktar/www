const pgp = require("pg-promise")();

// Singleton connection contract for Postgresql from:
// https://www.codeoftheprogrammer.com/2020/01/16/postgresql-from-nextjs-api-route/

// Get these values from configuration
const user = "admin";
const password = "password";
const host = "kontaktardb.crpycooyf4pt.eu-west-2.rds.amazonaws.com";
const port = "5432";
const database = "kontaktar";

// Use a symbol to store a global instance of a connection, and to access it from the singleton.
const DB_KEY = Symbol.for("Kontaktar.db");
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDatabase = globalSymbols.includes(DB_KEY);
if (!hasDatabase) {
  global[DB_KEY] = pgp(
    `postgres://${user}:${password}@${host}:${port}/${database}`
  );
}

// Create and freeze the singleton object so that it has an instance property.
const singleton = {};
Object.defineProperty(singleton, "instance", {
  get() {
    return global[DB_KEY];
  }
});
Object.freeze(singleton);

module.exports = singleton.instance;

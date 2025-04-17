const Database = require('better-sqlite3');
const db = new Database('./data/database.sqlite');

// Inicijuojam lenteles
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    category TEXT,
    userId INTEGER,
    FOREIGN KEY(userId) REFERENCES users(id)
  )
`).run();

module.exports = db;

const db = require('../config');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS notes(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

const Note = {
  create: (title, content, cb) => {
    const sql = 'INSERT INTO notes (title, content) VALUES (?, ?)';
    db.run(sql, [title, content], function (err) {
      if (err) return cb(err, null);
      cb(null, { id: this.lastID, title, content });
    });
  },

  findAll: (cb) => {
    const sql = 'SELECT * FROM notes ORDER BY createdAt DESC';
    db.all(sql, [], (err, rows) => {
      if (err) return cb(err, null);
      cb(null, rows);
    });
  },

  findById: (id, cb) => {
    const sql = 'SELECT * FROM notes WHERE id = ?';
    db.get(sql, [id], (err, row) => {
      if (err) return cb(err, null);
      cb(null, row);
    });
  },

  update: (id, title, content, cb) => {
    const sql = `
      UPDATE notes SET title = ?, content = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?
    `;
    db.run(sql, [title, content, id], function (err) {
      if (err) return cb(err, null);
      cb(null, { changes: this.changes });
    });
  },

  delete: (id, cb) => {
    const sql = 'DELETE FROM notes WHERE id = ?';
    db.run(sql, [id], function (err) {
      if (err) return cb(err, null);
      cb(null, { changes: this.changes });
    });
  }
};

module.exports = Note;

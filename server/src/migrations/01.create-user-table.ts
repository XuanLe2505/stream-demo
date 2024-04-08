import db from "../db";

const SQL = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    delete_at TIMESTAMP
  )`;

(async () => {
  try {
    const data = await new Promise((resolve) => {
      db.query(SQL, (err, results, fields) => resolve(results));
    });
    console.log({ data });
  } finally {
    process.exit(0);
  }
})();

// varchar : kí tự không dấu
// nvarchar: kí tự có dấu

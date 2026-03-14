import pg from "pg";
let db;
if (!db) {
  db = new pg.Pool({
    connectionString: process.env.DB_CONN,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}
export { db };

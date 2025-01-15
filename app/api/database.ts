import pg from 'pg';

const { Pool } = pg;


const pool = new Pool({
  connectionString: process.env.PG_URL,
  ssl: {
    rejectUnauthorized: false,
  }
});


export default pool;

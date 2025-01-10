import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.PG_URL,
  ssl: {
    rejectUnauthorized: false,
  }
});

export default pool;

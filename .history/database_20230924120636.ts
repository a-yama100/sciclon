// E:\programming\Project\sciclon\database.ts

import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sciclon',
  password: 's',
  port: 5432,
});

export default pool;

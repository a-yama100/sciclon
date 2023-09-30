// E:\programming\Project\sciclon\pages\api\database.ts

import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sciclon',
  password: 'syougakk',
  port: 5432,
});

export default pool;

// E:\programming\Project\sciclon\database.ts

// database.ts

import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sciclon',
  password: 'your_password',
  port: 5432,
});

export default pool;

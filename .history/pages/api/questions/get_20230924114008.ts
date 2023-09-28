import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sciclon',
  password: 'your_password',
  port: 5432,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM question ORDER BY RANDOM() LIMIT 1');
      res.status(200).send(rows[0]);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch question' });
    }
  } else {
    res.status(405).send({ error: 'Method not allowed' });
  }
}

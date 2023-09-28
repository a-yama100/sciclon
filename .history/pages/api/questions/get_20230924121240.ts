// E:\programming\Project\sciclon\pages\api\questions\get.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../database';

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

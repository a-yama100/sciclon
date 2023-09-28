// E:\programming\Project\sciclon\pages\api\questions\categories.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../....//database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await pool.query('SELECT DISTINCT category FROM term');
    res.status(200).json(result.rows.map(row => row.category));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}

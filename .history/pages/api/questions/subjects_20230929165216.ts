// E:\programming\Project\sciclon\pages\api\questions\subjects.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await pool.query('SELECT name FROM subjects');
    res.status(200).json(result.rows.map(row => row.name));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}

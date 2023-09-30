// pages/api/questions/aws_associate_solutions_architect.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const { rows } = await pool.query('SELECT * FROM aws_associate_solutions_architect_questions');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch questions.' });
    }
}

// E:\programming\Project\sciclon\pages\api\questions\randomTermFromCertification.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const { rows } = await pool.query('SELECT * FROM aws_associate_solutions_architect_glossary ORDER BY RANDOM() LIMIT 1');
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch random term.' });
    }
}

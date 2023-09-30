E:\programming\Project\sciclon\pages\questions\categories.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../api/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const { rows } = await pool.query('SELECT * FROM aws_certification_list');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories.' });
    }
}

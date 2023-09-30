// E:\programming\Project\sciclon\pages\api\questions\randomTermFromGlossary.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const glossaryTable = req.query.glossary;

    try {
        const { rows } = await pool.query(`SELECT * FROM ${glossaryTable} ORDER BY RANDOM() LIMIT 1`);
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch random term.' });
    }
}

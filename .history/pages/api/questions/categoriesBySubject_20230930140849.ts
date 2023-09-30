// E:\programming\Project\sciclon\pages\api\questions\categoriesBySubject.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }
    const subjectGlossary = req.query.subjectGlossary;

    const subjectGlossary = req.query.subjectGlossary;
    const categoryTable = subjectGlossary.replace('glossary', 'categories');

    try {
        const { rows } = await pool.query(`SELECT * FROM ${categoryTable}`);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories.' });
    }
}

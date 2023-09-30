// E:\programming\Project\sciclon\pages\api\questions\randomTermFromGlossary.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const glossaryTable = req.query.glossary;
    const categoryTable = glossaryTable.replace('glossary', 'categories');

    try {
        const { rows } = await pool.query(`SELECT * FROM ${glossaryTable} ORDER BY RANDOM() LIMIT 1`);
        const term = rows[0];

        const { rows: categoryRows } = await pool.query(`SELECT * FROM ${categoryTable} WHERE id = $1`, [term.category_id]);
        const category = categoryRows[0];

        res.status(200).json({ ...term, categoryName: category ? category.aws_asa_category : null });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch random term.' });
    }
}

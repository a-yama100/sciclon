E:\programming\Project\sciclon\pages\api\questions\byCategory.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const category = req.query.category;
    const { rows } = await pool.query('SELECT * FROM question INNER JOIN term ON question.term_id = term.term_id WHERE term.category = $1', [category]);
    res.status(200).json(rows);
}

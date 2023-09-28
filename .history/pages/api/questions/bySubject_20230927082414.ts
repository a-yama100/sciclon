// E:\programming\Project\sciclon\pages\api\questions\bySubject.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const subject = req.query.subject;
    const { rows } = await pool.query('SELECT * FROM question INNER JOIN term ON question.term_id = term.term_id WHERE term.subject_id = $1', [category]);
    res.status(200).json(rows);
}

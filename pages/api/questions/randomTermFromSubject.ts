// E:\programming\Project\sciclon\pages\api\questions\randomTermFromSubject.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const subject = req.query.subject;
    // サブジェクトに基づいてランダムな用語と解説を取得
    try {
        const { rows } = await pool.query('SELECT * FROM ?? ORDER BY RANDOM() LIMIT 1', [subject]);  // "subject"は適切なテーブル名に置き換える必要があります
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch random term.' });
    }
}

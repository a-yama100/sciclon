// E:\programming\Project\sciclon\pages\api\questions\byCertification.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const certificationId = req.query.id;

    try {
        // このSQLクエリは、提供されたデータベースのスキーマに基づいています。
        // 実際のテーブル名やカラム名に合わせて変更する必要があるかもしれません。
        const { rows } = await pool.query('SELECT * FROM questions WHERE certification_id = $1', [certificationId]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch questions for the selected certification.' });
    }
}

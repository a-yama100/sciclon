// E:\programming\Project\sciclon\pages\api\users\data.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import pool from '../../../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    // トークンをリクエストヘッダーから取得
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ error: 'Authorization token missing' });
    }

    let decoded;
    try {
        // トークンをデコード
        decoded = jwt.verify(token, 'your_secret_key');
    } catch (error) {
        return res.status(401).send({ error: 'Invalid token' });
    }

    // デコードしたデータからユーザーIDを取得
    const userId = decoded.userId;

    const { rows } = await pool.query('SELECT * FROM users WHERE users_id = $1', [userId]);
    const user = rows[0];

    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send(user);
}

// E:\programming\Project\sciclon\pages\api\users\update.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import pool from '../../../database';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
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

    const { email } = req.body;
    const { rows } = await pool.query('UPDATE users SET email = $1 WHERE users_id = $2 RETURNING *', [email, userId]);
    const user = rows[0];

    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send(user);
}

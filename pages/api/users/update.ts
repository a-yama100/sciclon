// E:\programming\Project\sciclon\pages\api\users\update.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../database';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// JwtPayloadの型を拡張して、カスタムのプロパティを追加
interface CustomJwtPayload extends JwtPayload {
    userId?: number;  // userIdが存在する場合には数字として型付け
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    // トークンをリクエストヘッダーから取得
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ error: 'Authorization token missing' });
    }

    let decoded: CustomJwtPayload;
    try {
        // トークンをデコード
        decoded = jwt.verify(token, 'your_secret_key') as CustomJwtPayload;
    } catch (error) {
        return res.status(401).send({ error: 'Invalid token' });
    }

    // デコードしたデータからユーザーIDを取得
    const userId = decoded.userId;

    const { email, member_name, password } = req.body;
    const { rows } = await pool.query('UPDATE member_information SET email = $1 WHERE id = $2 RETURNING *', [email, userId]);
    const user = rows[0];

    try {
        const updatedValues = [email, member_name, userId];
        let query = 'UPDATE member_information SET email = $1, member_name = $2';

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            query += ', password = $4';
            updatedValues.push(hashedPassword);
        }

        query += ' WHERE id = $3 RETURNING *';

        const { rows } = await pool.query(query, updatedValues);
        const user = rows[0];

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: 'Failed to update user' });
    }
}
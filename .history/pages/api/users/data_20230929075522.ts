// E:\programming\Project\sciclon\pages\api\\data.ts

import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';
import pool from '../../../database';

type CustomJwtPayload = JwtPayload & {
    userId: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    // トークンをリクエストヘッダーから取得
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ error: 'Authorization token missing' });
    }

    let decoded: CustomJwtPayload | string;
    try {
        decoded = jwt.verify(token, 'your_secret_key') as CustomJwtPayload;
    } catch (error) {
        return res.status(401).send({ error: 'Invalid token' });
    }

    const userId = decoded.userId;

    const { rows } = await pool.query('SELECT * FROM imember_information WHERE id = $1', [userId]);
    const user = rows[0];

    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send(user);
}

// E:\programming\Project\sciclon\pages\api\users\me.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    // TODO: トークンやセッションを使用して現在のユーザーIDを確認

    const userId = /* ユーザーID */;

    const { rows } = await pool.query('SELECT * FROM users WHERE users_id = $1', [userId]);
    const user = rows[0];

    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send(user);
}

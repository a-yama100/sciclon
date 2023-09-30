// E:\programming\Project\sciclon\pages\api\certifications\gcp.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const { rows } = await pool.query('SELECT * FROM gcp_certification_list');
    res.status(200).json(rows);
}

// E:\programming\Project\sciclon\pages\api\certifications\aws.ts

// /pages/api/certifications/aws.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    const { rows } = await pool.query('SELECT * FROM aws_certification_list');
    res.status(200).json(rows);
}

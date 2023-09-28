// E:\programming\Project\sciclon\pages\api\users\register.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import pool from '../../../database';

const pool = new Pool({
  user: user,
  host: 'host',
  database: 'database',
  password: 'password',
  port: 5432,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
      res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).send({ error: 'Failed to register user' });
    }
  } else {
    res.status(405).send({ error: 'Method not allowed' });
  }
}
// E:\programming\Project\sciclon\pages\api\users\login.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../../database';

const pool = new Pool({
  user: 'user',
  host: 'host',
  database: 'database',
  password: 'password',
  port: 5432,
});


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = rows[0];

      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user.users_id }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).send({ message: 'Logged in successfully', token });
      } else {
        res.status(401).send({ error: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).send({ error: 'Failed to login' });
    }
  } else {
    res.status(405).send({ error: 'Method not allowed' });
  }
}

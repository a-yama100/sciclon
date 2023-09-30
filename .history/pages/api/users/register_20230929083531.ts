// E:\programming\Project\sciclon\pages\api\users\register.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const result = await pool.query(
        'INSERT INTO member_information (email, password) VALUES ($1, $2) RETURNING id',
        [email, hashedPassword]
      );
      
      const userId = result.rows[0].id;
      const token = jwt.sign({ userId }, 'your_secret_key', { expiresIn: '1h' });

      res.status(201).send({ message: 'User registered successfully', token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ error: 'Failed to register user', details: error.message });
      } else {
        res.status(500).send({ error: 'Failed to register user' });
      }
    }
  }
}
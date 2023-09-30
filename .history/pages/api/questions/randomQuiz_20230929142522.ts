// E:\programming\Project\sciclon\pages\api\questions\randomQuiz.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../database';
import QuizComponent from '../../';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { rows } = await pool.query('SELECT * FROM aws_associate_solutions_architect_glossary ORDER BY RANDOM() LIMIT 1');
        const term = rows[0];

        const { rows: wrongAnswers } = await pool.query('SELECT * FROM aws_associate_solutions_architect_glossary WHERE category_id = $1 AND id != $2 ORDER BY RANDOM() LIMIT 3', [term.category_id, term.id]);

        const choices = [
            term.explanation,
            ...wrongAnswers.map(row => row.explanation)
        ];

        res.status(200).json({
            term: term.term,
            choices: choices.sort(() => Math.random() - 0.5),
            correctAnswer: term.explanation
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quiz data.' });
    }
}

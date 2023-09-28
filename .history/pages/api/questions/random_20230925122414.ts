import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // termからランダムに1つ選択
    const term = await pool.query("SELECT * FROM term ORDER BY RANDOM() LIMIT 1");
    const category = term.rows[0].category;

    // 同じカテゴリーのtermをランダムに3つ取得 (選択したtermを除く)
    const otherTerms = await pool.query("SELECT * FROM term WHERE category = $1 AND term_id != $2 ORDER BY RANDOM() LIMIT 3", [category, term.rows[0].term_id]);

    // 4択問題の選択肢を作成
    const choices = [
      { term_id: term.rows[0].term_id, explanation: term.rows[0].explanation },
      ...otherTerms.rows.map(t => ({ term_id: t.term_id, explanation: t.explanation }))
    ].sort(() => Math.random() - 0.5); // シャッフル

    res.json({
      term: term.rows[0].text,
      choices: choices,
      correctExplanation: term.rows[0].explanation
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the question." });
  }
}

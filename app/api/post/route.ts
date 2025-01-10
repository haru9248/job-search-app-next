import { NextResponse } from 'next/server';
import pool from '../database';

export async function POST(request: Request): Promise<NextResponse> {
  const client = await pool.connect();
  try {
    const { title, salary, category } = await request.json();

    // カテゴリ名からcategory_idを取得
    const categoryRes = await client.query('SELECT id FROM categories WHERE name = $1', [category]);
    if (categoryRes.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid category name' }, { status: 400 });
    }
    const categoryId = categoryRes.rows[0].id;

    // jobsテーブルに新しいジョブを挿入
    await client.query(
      'INSERT INTO jobs (title, salary, category_id) VALUES ($1, $2, $3)',
      [title, salary, categoryId]
    );

    return NextResponse.json({ success: true });
  } finally {
    client.release();
  }
}

import { NextResponse } from 'next/server';
import pool from '../database';

export async function GET(): Promise<NextResponse> {
  const client = await pool.connect();

  try {
    const res = await client.query(` SELECT jobs.id, jobs.salary, categories.name AS category_name, jobs.title FROM jobs JOIN categories ON jobs.category_id = categories.id`);
    return NextResponse.json(res.rows, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    // エラーハンドリング
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  } finally {
    client.release();
  }
}


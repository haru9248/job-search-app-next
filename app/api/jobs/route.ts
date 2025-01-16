export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import pool from '../database';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const client = await pool.connect();
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const salary = searchParams.get("salary");
  try {
    const res = await client.query(` SELECT jobs.id, jobs.salary, categories.name AS category_name, jobs.title FROM jobs JOIN categories ON jobs.category_id = categories.id`);
    const filteredCategory = category ? res.rows.filter((job) => job.category_name === category) : res.rows;
    const filteredSalary = salary ? filteredCategory.filter((job) => job.salary >= salary) : filteredCategory
    return NextResponse.json(filteredSalary);
  } catch (error) {
    // エラーハンドリング
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  } finally {
    client.release();
  }
}

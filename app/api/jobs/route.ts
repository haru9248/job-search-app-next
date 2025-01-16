export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import pool from '../database';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const client = await pool.connect();
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const salary = searchParams.get("salary");

  try {
    const res = await client.query(`
      SELECT jobs.id, jobs.salary, categories.name AS category_name, jobs.title 
      FROM jobs 
      JOIN categories ON jobs.category_id = categories.id
    `);

    let filteredCategory = res.rows;

    // 複数カテゴリの処理
    if (category) {
      const categoriesArray = category.split(',');  // カンマ区切りのカテゴリーを配列に変換
      filteredCategory = filteredCategory.filter((job) =>
        categoriesArray.includes(job.category_name)  // カテゴリ名が配列内にあるかチェック
      );
    }

    // 年収のフィルタリング
    const filteredSalary = salary
      ? filteredCategory.filter((job) => job.salary >= parseInt(salary, 10))
      : filteredCategory;

    return NextResponse.json(filteredSalary);
  } catch (error) {
    // エラーハンドリング
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  } finally {
    client.release();
  }
}
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import pool from '../database';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const client = await pool.connect();
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const salary = searchParams.get("salary");
  const page = parseInt(searchParams.get("page") || '1', 10);  // ページ番号を取得、デフォルトは1

  // 1ページあたりの求人数を指定
  const limit = 10;
  const offset = (page - 1) * limit;  // 現在のページに基づくオフセットを計算

  try {
    // 求人情報とカテゴリを取得
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

    // フィルタリング後の求人情報に基づくページネーション
    const totalJobs = filteredSalary.length;  // フィルタリング後の求人数
    const totalPages = Math.ceil(totalJobs / limit);

    // 現在のページに対するデータを取得
    const paginatedJobs = filteredSalary.slice(offset, offset + limit); // 1ページ分のデータ

    return NextResponse.json({
      jobs: paginatedJobs,
      totalPages: totalPages,
      totalJobs: totalJobs,
    });
  } catch (error) {
    // エラーハンドリング
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  } finally {
    client.release();
  }
}
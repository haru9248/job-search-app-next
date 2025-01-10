import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react'

const page = () => {
    const postJob = async (formData: FormData) => {
        "use server"
        console.log(formData);
        const title = formData.get('title');
        const salary = formData.get('salary');
        const category = formData.get('category');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        await fetch(`${apiUrl}/api/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, salary, category})
        });
        revalidatePath("/")
        redirect("/")
        }
    
  return (
    <div className="pl-8 pt-4">
        <h2 className="mb-3 text-xl font-bold">求人投稿</h2>
        <form action={postJob}>
            <p className="mb-2">求人カテゴリ選択</p>
            <select name="category" defaultValue="0" className="appearance-none border-2 rounded-none p-1 w-1/3 pl-3">
                <option value="0" disabled>カテゴリを選択 ▼</option>
                <option>事務</option>
                <option>エンジニア</option>
                <option>営業</option>
                <option>デザイン</option>
                <option>マーケティング</option>
                <option>財務・経理</option>
                <option>人事</option>
                <option>カスタマーサポート</option>
                <option>製造</option>
                <option>医療・介護</option>
            </select>
            <p className="mb-2 mt-2">年収（万円）</p>
            <input className="appearance-none border-2 rounded-none p-1 w-1/3 pl-3" type="text" name="salary"/>
            <p className="mb-2 mt-2">求人タイトル</p>
            <input className="appearance-none border-2 rounded-none p-1 w-2/3 pl-3" type="text" name="title"/>
            <div>
            <button className="rounded-md bg-blue-500 w-1/3 text-white mt-10 p-2" type="submit">投稿</button>
            </div>
                
        </form>
    </div>
  )
}

export default page
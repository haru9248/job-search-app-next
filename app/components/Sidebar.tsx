"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // App Router を使用

const categories = [
  { id: 1, name: "事務" },
  { id: 2, name: "エンジニア" },
  { id: 3, name: "営業" },
  { id: 4, name: "デザイン" },
  { id: 5, name: "マーケティング" },
  { id: 6, name: "財務・経理" },
  { id: 7, name: "人事" },
  { id: 8, name: "カスタマーサポート" },
  { id: 9, name: "製造" },
  { id: 10, name: "医療・介護" },
];

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSalary, setSelectedSalary] = useState<string>("300");

  // カテゴリーチェックボックスの変更処理
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((cat) => cat !== category)
        : [...prevSelectedCategories, category]
    );
  };

  // 年収の変更処理
  const handleSalaryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSalary(event.target.value);
  };

  // URLのクエリを更新する関数
  const updateQueryParams = () => {
    // 選択されたカテゴリーをクエリパラメータ形式に変換
    const categoryQuery = selectedCategories.join(',');
    const salaryQuery = selectedSalary;

    // URLにクエリをセット
    router.push(`/?category=${categoryQuery}&salary=${salaryQuery}`);
  };

  // フィルター変更時にURLを更新
  useEffect(() => {
    updateQueryParams();
  }, [selectedCategories, selectedSalary]);

  return (
    <div className="w-1/3 bg-gray-100 p-4 h-[200vh]">
      <form>
        <h2 className="text-xl font-bold mb-2">求人カテゴリ</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="mb-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.name)}
                onChange={() => handleCategoryChange(category.name)}
              />
              <label className="ml-2">{category.name}</label>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-bold mb-2">年収</h2>
        <select
          onChange={handleSalaryChange}
          value={selectedSalary}
          className="appearance-none border-2 rounded-none w-full p-1 pl-2"
        >
          <option value="300">300万円以上</option>
          <option value="500">500万円以上</option>
          <option value="700">700万円以上</option>
          <option value="900">900万円以上</option>
        </select>
      </form>
    </div>
  );
};

export default Sidebar;
import React, { useState } from 'react';

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

type SidebarProps = {
    onFilterChange: (filters: { category: string[]; salary: number | null }) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSalary, setSelectedSalary] = useState<number | null>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((cat) => cat !== category)
        : [...prevSelectedCategories, category]
    );
  };

  const handleSalaryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSalary(Number(event.target.value));
  };

  // フィルターが変更されたときに親コンポーネントに通知
  React.useEffect(() => {
    onFilterChange({ category: selectedCategories, salary: selectedSalary });
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
        <select onChange={handleSalaryChange} value={selectedSalary ?? ''} className="appearance-none border-2 rounded-none w-full p-1 pl-2">
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
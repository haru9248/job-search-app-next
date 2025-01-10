import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className="text-white bg-blue-800 flex justify-between h-[7vh]">
      <h1 className="p-4 text-2xl font-bold">求人検索アプリ</h1>
      <nav className="p-4">
      <Link href="/" className="px-2">求人検索</Link>
      <Link href="/post">求人投稿</Link>
      </nav>
    </div>
  )
}

export default Header

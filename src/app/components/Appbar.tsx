// components/AppBar.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  const toggleDropdown = (name: any) => {
    setDropdown(dropdown === name ? null : name);
  };

  const functionList = [
    { name: "와카 숏츠", path: "wakashorts" },
    { name: "와카 챗", path: "wakachat" },
    { name: "클라우드 스페이스", path: "cloudspace" },
    { name: "에디터", path: "editor" },
    { name: "내보내기 목록", path: "exportlist" },
    { name: "브랜드 관리", path: "brand" },
  ];

  const languageList = [
    { name: "한국어", code: "ko" },
    { name: "English", code: "en" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // @ts-ignore
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    setDropdown(null);
  }, [pathname]);

  return (
    <header className="w-full px-6 py-3 bg-white dark:bg-gray-900 shadow-sm fixed top-0 z-50">
      <div
        className="max-w-7xl mx-auto flex items-center justify-between"
        ref={dropdownRef}
      >
        {/* Left side */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-extrabold text-blue-600">
            WakaWaka
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-800 dark:text-gray-200">
            <div className="relative">
              <button
                onClick={() => toggleDropdown("주요 기능")}
                className="hover:text-blue-600 transition"
              >
                주요 기능 <span className="ml-1">▼</span>
              </button>
              {dropdown === "주요 기능" && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-md z-10">
                  <ul className="text-sm text-gray-700 dark:text-gray-200">
                    {functionList.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={`/function/${item.path}`}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Link href="/pricing" className="hover:text-blue-600 transition">
              요금
            </Link>
            <div className="relative">
              <button
                onClick={() => toggleDropdown("고객센터")}
                className="hover:text-blue-600 transition"
              >
                고객센터 <span className="ml-1">▼</span>
              </button>
              {dropdown === "고객센터" && (
                <div className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-md rounded-md z-10">
                  <ul className="text-sm text-gray-700 dark:text-gray-200">
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      문의하기
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      자주 묻는 질문
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center space-x-4 text-sm relative">
          <div
            className="cursor-pointer hover:text-blue-600 text-gray-700 dark:text-gray-300"
            onClick={() => toggleDropdown("language")}
          >
            🌐 <span className="ml-1">한국어</span>{" "}
            <span className="ml-1">▼</span>
          </div>
          {dropdown === "language" && (
            <div className="absolute right-24 top-10 w-32 bg-white dark:bg-gray-800 shadow-md rounded-md z-10">
              <ul className="text-sm text-gray-700 dark:text-gray-200">
                {languageList.map((lang, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    {lang.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-6 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center px-1 transition-colors"
          >
            <div
              className={`w-4 h-4 bg-white dark:bg-black rounded-full transform transition-transform ${
                isDark ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>

          <button className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition">
            → 지금 시작하기
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown (생략 가능, 유사하게 수정 가능) */}
    </header>
  );
}

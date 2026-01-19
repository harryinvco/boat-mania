'use client';

import { useRef, useEffect } from 'react';
import { Category } from '@/types';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onSelect: (categoryId: string) => void;
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onSelect,
}: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const activeEl = activeRef.current;
      const scrollLeft = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeCategory]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3"
    >
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <button
            key={category.id}
            ref={isActive ? activeRef : null}
            onClick={() => onSelect(category.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all duration-200 touch-scale ${
              isActive
                ? 'bg-gradient-to-r from-[#00C896] to-[#00A87A] text-white shadow-md'
                : 'bg-white text-gray-600 shadow-sm hover:shadow-md'
            }`}
          >
            <span className="text-base">{category.icon}</span>
            <span className="text-sm font-semibold">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}


import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const categoryColors = {
    all: 'border-gray-300 hover:border-gray-400',
    work: 'border-todo-blue hover:border-todo-blue',
    personal: 'border-todo-purple hover:border-todo-purple',
    shopping: 'border-todo-green hover:border-todo-green',
    health: 'border-todo-red hover:border-todo-red',
    other: 'border-todo-yellow hover:border-todo-yellow',
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelectCategory(null)}
        className={cn(
          "px-3 py-1 rounded-full text-sm border-2 transition-colors",
          selectedCategory === null 
            ? "bg-primary text-primary-foreground border-primary" 
            : "bg-background text-foreground border-gray-300 hover:border-gray-400"
        )}
      >
        All
      </button>
      
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={cn(
            "px-3 py-1 rounded-full text-sm border-2 transition-colors",
            selectedCategory === category 
              ? "bg-primary text-primary-foreground border-primary" 
              : `bg-background text-foreground ${categoryColors[category as keyof typeof categoryColors] || 'border-gray-300 hover:border-gray-400'}`
          )}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

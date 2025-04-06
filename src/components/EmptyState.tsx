
import React from 'react';
import { ListTodo } from 'lucide-react';

interface EmptyStateProps {
  filter: string | null;
}

const EmptyState: React.FC<EmptyStateProps> = ({ filter }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-muted rounded-full p-6 mb-4">
        <ListTodo size={48} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-medium mb-2">
        {filter ? 'No tasks in this category' : 'No tasks yet'}
      </h3>
      <p className="text-muted-foreground text-center max-w-md">
        {filter
          ? `You don't have any ${filter} tasks. Add a new task with this category or select a different filter.`
          : "Your to-do list is empty. Add your first task to get started!"}
      </p>
    </div>
  );
};

export default EmptyState;

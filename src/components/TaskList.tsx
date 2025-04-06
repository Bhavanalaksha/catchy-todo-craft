
import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '@/types/task';
import EmptyState from './EmptyState';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  filter: string | null;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onDelete, 
  onComplete, 
  onEdit,
  filter
}) => {
  // Filter tasks by category if filter is set
  const filteredTasks = filter 
    ? tasks.filter(task => task.category === filter)
    : tasks;

  if (filteredTasks.length === 0) {
    return <EmptyState filter={filter} />;
  }

  return (
    <div>
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onComplete={onComplete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;

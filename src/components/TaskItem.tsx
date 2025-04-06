
import React, { useState } from 'react';
import { Check, Trash, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Task } from '@/types/task';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onDelete, 
  onComplete,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [isCompleting, setIsCompleting] = useState(false);

  const categoryColors = {
    work: 'border-todo-blue',
    personal: 'border-todo-purple',
    shopping: 'border-todo-green',
    health: 'border-todo-red',
    other: 'border-todo-yellow',
  };

  const priorityClasses = {
    high: 'bg-red-50 dark:bg-red-950/20',
    medium: 'bg-yellow-50 dark:bg-yellow-950/20',
    low: 'bg-green-50 dark:bg-green-950/20',
  };

  const handleComplete = () => {
    setIsCompleting(true);
    // Delay the actual completion to allow for animation
    setTimeout(() => onComplete(task.id), 500);
  };

  const handleSaveEdit = () => {
    onEdit(task.id, editedText);
    setIsEditing(false);
  };

  const categoryColor = categoryColors[task.category as keyof typeof categoryColors] || 'border-gray-300';
  const priorityClass = priorityClasses[task.priority as keyof typeof priorityClasses] || '';

  return (
    <div 
      className={cn(
        "flex items-center gap-2 p-4 rounded-lg border-l-4 mb-3 shadow-sm transition-all",
        categoryColor,
        priorityClass,
        isCompleting && "animate-task-complete opacity-0",
        task.completed && "opacity-50 line-through",
        "group hover:shadow-md"
      )}
    >
      <button 
        onClick={handleComplete}
        className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
          task.completed ? "bg-green-500 border-green-500" : "border-gray-300 hover:border-green-400"
        )}
      >
        {task.completed && <Check size={14} className="text-white" />}
      </button>
      
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="flex-1 px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          <button 
            onClick={handleSaveEdit}
            className="px-3 py-1 bg-primary text-primary-foreground rounded-md"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex-1 text-sm sm:text-base">
          {task.text}
          <div className="text-xs text-muted-foreground mt-1">
            {task.category && (
              <span className="inline-block px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground mr-2">
                {task.category}
              </span>
            )}
            {task.priority && (
              <span className="inline-block px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                {task.priority}
              </span>
            )}
          </div>
        </div>
      )}
      
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setIsEditing(true)}
          className="p-1.5 hover:bg-secondary rounded-md"
          title="Edit"
        >
          <Edit size={16} />
        </button>
        <button 
          onClick={() => onDelete(task.id)}
          className="p-1.5 hover:bg-destructive hover:text-destructive-foreground rounded-md"
          title="Delete"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

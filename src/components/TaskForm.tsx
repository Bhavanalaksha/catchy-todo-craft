import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Task } from '@/types/task';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('personal');
  const [priority, setPriority] = useState('medium');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask({
        text,
        category,
        priority,
      });
      setText('');
      // Keep the form expanded after submission
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="mb-6 bg-card rounded-lg p-4 shadow-sm transition-all"
    >
      <div className="flex gap-2 items-center mb-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder="Add a new task..."
          className="flex-1 p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-primary text-primary-foreground rounded-md p-2 disabled:opacity-50"
        >
          <PlusCircle size={20} />
        </button>
      </div>
      
      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 animate-fade-in">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      )}
    </form>
  );
};

export default TaskForm;

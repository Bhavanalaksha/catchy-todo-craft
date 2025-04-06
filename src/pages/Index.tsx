
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/AuthContext';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import CategoryFilter from '@/components/CategoryFilter';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Get unique categories from tasks
  const categories = [...new Set(tasks.map(task => task.category))];

  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID(),
      completed: false,
    };
    
    setTasks(prevTasks => [task, ...prevTasks]);
    toast({
      title: "Task added",
      description: "Your task has been successfully added.",
    });
  };

  const handleDelete = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "Your task has been removed.",
      variant: "destructive",
    });
  };

  const handleComplete = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed } 
          : task
      )
    );
    
    // Find the task to check if it's being completed or uncompleted
    const taskBeingUpdated = tasks.find(task => task.id === id);
    if (taskBeingUpdated) {
      if (!taskBeingUpdated.completed) {
        toast({
          title: "Task completed",
          description: "Great job! You've completed a task.",
        });
      }
    }
  };

  const handleEdit = (id: string, newText: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { ...task, text: newText } 
          : task
      )
    );
    toast({
      title: "Task updated",
      description: "Your task has been updated.",
    });
  };

  // Filter completed tasks to the bottom
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-2xl px-4 py-12">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Task Master</h1>
            <Link to="/profile">
              <Button variant="outline" size="sm" className="gap-2">
                <User size={16} />
                Profile
              </Button>
            </Link>
          </div>
          <p className="text-muted-foreground text-center">
            Welcome, {user?.email}! Stay organized and boost your productivity.
          </p>
        </header>
        
        <TaskForm onAddTask={handleAddTask} />
        
        {categories.length > 0 && (
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}
        
        <TaskList 
          tasks={sortedTasks} 
          onDelete={handleDelete}
          onComplete={handleComplete}
          onEdit={handleEdit}
          filter={selectedCategory}
        />
      </div>
    </div>
  );
};

export default Index;

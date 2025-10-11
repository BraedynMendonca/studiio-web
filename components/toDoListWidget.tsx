"use client"

import { useState, useEffect, useCallback } from "react"
import { LayoutList, Trash2, GripVertical, Edit2, Save, X } from "lucide-react"
import { arrayMoveImmutable } from 'array-move';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type DragEndEvent = { active: { id: string | number }; over: { id: string | number } | null };

interface TaskItem {
  id: number;
  name: string;
  completed: boolean;
}

function SortableTaskItem({
  task,
  onRemove,
  onEdit,
  onSave,
  onCancel,
  isEditing,
  onToggleComplete
}: {
  task: TaskItem;
  onRemove: (id: number) => void;
  onEdit: (id: number) => void;
  onSave: (id: number, name: string) => void;
  onCancel: () => void;
  onToggleComplete: (id: number) => void;
  isEditing: boolean;
}) {
  const [editName, setEditName] = useState(task.name);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    if (editName.trim()) {
      onSave(task.id, editName.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    else if (e.key === 'Escape') onCancel();
  };

  if (isEditing) {
    return (
      <div className="border border-blue-500 rounded p-2 bg-gray-800" style={style} ref={setNodeRef}>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-gray-700 text-white px-2 py-1 rounded text-sm"
            autoFocus
          />
          <button onClick={handleSave} className="text-green-500 hover:text-green-400 p-1">
            <Save className="w-4 h-4" />
          </button>
          <button onClick={onCancel} className="text-gray-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <li ref={setNodeRef} style={style} className="flex items-center border border-gray-600 rounded p-2 hover:border-white transition-colors group relative">
      <button {...attributes} {...listeners} className="cursor-grab p-1 mr-1 text-gray-400 hover:text-white active:cursor-grabbing">
        <GripVertical className="w-3 h-3" />
      </button>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        className="mr-2 cursor-pointer"
      />
      <span className={`flex-1 text-sm truncate ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
        {task.name}
      </span>
      <div className="flex ml-auto gap-1">
        <button onClick={() => onEdit(task.id)} className="text-gray-400 hover:text-blue-400 p-1">
          <Edit2 className="w-3 h-3" />
        </button>
        <button onClick={() => onRemove(task.id)} className="text-gray-400 hover:text-red-400 p-1">
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </li>
  );
}

const getStoredTasks = (): TaskItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('studiio-tasks');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

function ClientOnlyTodoWidget() {
  const [isMounted, setIsMounted] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setTasks(getStoredTasks());
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('studiio-tasks', JSON.stringify(tasks));
  }, [tasks, isMounted]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex(item => item.id.toString() === active.id.toString());
        const newIndex = items.findIndex(item => item.id.toString() === over.id.toString());
        if (oldIndex === -1 || newIndex === -1) return items;
        return arrayMoveImmutable(items, oldIndex, newIndex);
      });
    }
  }, []);

  const addTask = () => {
    if (!taskName.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now(), name: taskName.trim(), completed: false }]);
    setTaskName("");
  };

  const removeTask = (id: number) => setTasks((prev) => prev.filter(t => t.id !== id));

  const startEditing = (id: number) => setEditingId(id);
  const saveEdit = (id: number, name: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, name } : t));
    setEditingId(null);
  };
  const cancelEdit = () => setEditingId(null);

  const toggleComplete = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  if (!isMounted) {
    return (
      <div className="glass-card backdrop-blur border border-border rounded-2xl p-4 flex flex-col h-full shadow-lg widget-hover min-h-[200px] animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-4 bg-gray-700 rounded"></div>
          <div className="h-4 w-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card backdrop-blur border border-border rounded-2xl p-4 flex flex-col h-full shadow-lg widget-hover">
      <div className="flex items-center gap-2 mb-4">
        <LayoutList className="w-4 h-4 text-accent-white" />
        <span className="text-gray-300 text-sm font-medium">To-Do List</span>
        {tasks.length > 0 && (
          <span className="text-xs text-gray-500 ml-auto">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </span>
        )}
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <ul className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-2 mb-4">
            {tasks.length === 0 ? (
              <li className="text-gray-500 text-xs italic text-center py-4">No tasks yet. Add your first task below.</li>
            ) : (
              tasks.map(task => (
                <SortableTaskItem
                  key={task.id}
                  task={task}
                  onRemove={removeTask}
                  onEdit={startEditing}
                  onSave={saveEdit}
                  onCancel={cancelEdit}
                  onToggleComplete={toggleComplete}
                  isEditing={editingId === task.id}
                />
              ))
            )}
          </ul>
        </SortableContext>
      </DndContext>
      <div className="border-t border-gray-700 pt-4">
        <div className="text-gray-300 text-sm font-medium mb-2">Add New Task</div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            className="flex-1 bg-input-bg border border-input-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={addTask}
            disabled={!taskName.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export function TodoWidget() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  if (!isClient) {
    return (
      <div className="glass-card backdrop-blur border border-border rounded-2xl p-4 flex flex-col h-full shadow-lg widget-hover min-h-[200px] animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-4 bg-gray-700 rounded"></div>
          <div className="h-4 w-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return <ClientOnlyTodoWidget />;
}

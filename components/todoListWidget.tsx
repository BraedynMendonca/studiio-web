"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { CheckSquare, Square, Trash2, Plus } from "lucide-react"

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

export function TodoListWidget() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [mounted, setMounted] = useState(false)

  // Load saved todos from localStorage on mount
  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      const savedTodos = localStorage.getItem("studiio-todos")
      if (savedTodos) {
        try {
          setTodos(JSON.parse(savedTodos))
        } catch (error) {
          console.error("Error loading todos:", error)
        }
      }
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("studiio-todos", JSON.stringify(todos))
    }
  }, [todos, mounted])

  const addTodo = () => {
    if (!newTodo.trim()) return

    const todo: TodoItem = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
    }

    setTodos([...todos, todo])
    setNewTodo("")
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  const completedCount = todos.filter((t) => t.completed).length
  const totalCount = todos.length

  return (
    <div
      className="glass-card rounded-2xl p-4 flex flex-col justify-center widget-hover flex-1"
      style={{ height: "100%", justifyContent: "flex-start" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-accent-white" />
          <span className="text-gray-300 text-sm font-medium">To-Do List</span>
        </div>
        {totalCount > 0 && (
          <span className="text-xs text-gray-400">
            {completedCount}/{totalCount}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar mb-3">
        {todos.length === 0 ? (
          <div className="text-gray-500 text-xs italic text-center py-4">No tasks yet. Add one below!</div>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-2 group border border-gray-600 rounded-lg p-2 hover:border-white transition-colors"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
                  aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                >
                  {todo.completed ? <CheckSquare className="w-4 h-4 text-green-400" /> : <Square className="w-4 h-4" />}
                </button>
                <span className={`flex-1 text-xs ${todo.completed ? "line-through text-gray-500" : "text-white"}`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-all"
                  aria-label="Delete task"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-gray-700 pt-3">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-input-bg border border-input-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={addTodo}
            disabled={!newTodo.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect, useCallback } from "react"
import { LayoutList, Trash2, GripVertical, Edit2, Save, X } from "lucide-react"
import { arrayMoveImmutable } from 'array-move';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Type definitions for drag and drop events
type DragEndEvent = {
  active: { id: string | number };
  over: { id: string | number } | null;
};

interface LinkItem {
  id: number;
  name: string;
  url: string;
}

function SortableLinkItem({ 
  link, 
  onRemove, 
  onEdit,
  onSave,
  onCancel,
  isEditing
}: { 
  link: LinkItem; 
  onRemove: (id: number) => void;
  onEdit: (id: number) => void;
  onSave: (id: number, name: string, url: string) => void;
  onCancel: () => void;
  isEditing: boolean;
}) {
  const [editName, setEditName] = useState(link.name);
  const [editUrl, setEditUrl] = useState(link.url);
  
  // Move useSortable to the top level to ensure consistent hook calls
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    if (editName.trim() && editUrl.trim()) {
      onSave(link.id, editName.trim(), editUrl.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };


  if (isEditing) {
    return (
      <div 
        className="border border-blue-500 rounded p-2 bg-gray-800"
        style={style}
        ref={setNodeRef}
      >
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-gray-700 text-white px-2 py-1 rounded text-sm"
            autoFocus
          />
          <div className="flex gap-2">
            <input
              type="url"
              value={editUrl}
              onChange={(e) => setEditUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-gray-700 text-white px-2 py-1 rounded text-sm"
              placeholder="https://example.com"
            />
            <button
              onClick={handleSave}
              className="text-green-500 hover:text-green-400 p-1"
              aria-label="Save changes"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-white p-1"
              aria-label="Cancel editing"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center border border-gray-600 rounded p-2 hover:border-white transition-colors group relative"
    >
      <button 
        {...attributes}
        {...listeners}
        className="cursor-grab p-1 mr-1 text-gray-400 hover:text-white active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="w-3 h-3" />
      </button>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white text-sm truncate max-w-[70%] hover:underline text-[12px]"
        title={link.url}
      >
        {link.name}
      </a>
      <div className="flex ml-auto">
        <button
          onClick={() => onEdit(link.id)}
          className="text-gray-400 hover:text-blue-400 p-1"
          aria-label={`Edit ${link.name}`}
        >
          <Edit2 className="w-3 h-3" />
        </button>
        <button
          onClick={() => onRemove(link.id)}
          className="text-gray-400 hover:text-red-400 p-1"
          aria-label={`Remove ${link.name}`}
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </li>
  );
}

// Helper function to safely get links from localStorage
const getStoredLinks = (): LinkItem[] => {
  // This function will only run on the client side
  if (typeof window === 'undefined') return [];
  
  try {
    const saved = localStorage.getItem('studiio-links');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading links from localStorage:', error);
    return [];
  }
};

// Client-side only component to prevent hydration issues
function ClientOnlyLinksWidget() {
  const [isMounted, setIsMounted] = useState(false);
  const [linkName, setLinkName] = useState("");
  const [linkURL, setLinkURL] = useState("");
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load links from localStorage on component mount
  useEffect(() => {
    setIsMounted(true);
    setLinks(getStoredLinks());
  }, []);

  // Save to localStorage whenever links change
  useEffect(() => {
    if (!isMounted) return; // Skip initial render
    
    try {
      localStorage.setItem('studiio-links', JSON.stringify(links));
    } catch (error) {
      console.error('Error saving links to localStorage:', error);
    }
  }, [links, isMounted]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setLinks((items) => {
        // Convert both IDs to strings for comparison to handle number/string mismatches
        const oldIndex = items.findIndex(item => item.id.toString() === active.id.toString());
        const newIndex = items.findIndex(item => item.id.toString() === over.id.toString());
        
        if (oldIndex === -1 || newIndex === -1) {
          return items; // No change if indices not found
        }
        
        return arrayMoveImmutable(items, oldIndex, newIndex);
      });
    }
  }, []);

  const addLink = () => {
    if (!linkName.trim() || !linkURL.trim()) {
      alert("Please enter a value")
      return
    }

    let url = linkURL.trim()
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url
    }

    try {
      new URL(url)
      setLinks((prev) => [...prev, { 
        id: Date.now(), 
        name: linkName.trim(), 
        url: url 
      }])
      setLinkName("")
      setLinkURL("")
    } catch {
      alert("Please enter a valid URL")
    }
  }

  const removeLink = (id: number) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const startEditing = (id: number) => {
    setEditingId(id);
  };

  const saveEdit = (id: number, name: string, url: string) => {
    setLinks(prev => 
      prev.map(link => 
        link.id === id ? { ...link, name, url } : link
      )
    );
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Need to move 8px before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Don't render anything on the server
  if (!isMounted) {
    return (
      <div className="glass-card rounded-2xl p-4 flex flex-col h-full widget-hover min-h-[200px] animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-4 bg-gray-700 rounded"></div>
          <div className="h-4 w-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-4 flex flex-col h-full widget-hover">
      <div className="flex items-center gap-2 mb-4">
        <LayoutList className="w-4 h-4 text-accent-white" />
        <span className="text-gray-300 text-sm font-medium">Links & Resources</span>
        {links.length > 0 && (
          <span className="text-xs text-gray-500 ml-auto">
            {links.length} {links.length === 1 ? 'link' : 'links'}
          </span>
        )}
      </div>

      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={links}
          strategy={verticalListSortingStrategy}
        >
          <ul className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-2 mb-4">
            {links.length === 0 ? (
              <li className="text-gray-500 text-xs italic text-center py-4">
                No links added yet. Add your first link below.
              </li>
            ) : (
              links.map((link) => (
                <SortableLinkItem 
                  key={link.id} 
                  link={link} 
                  onRemove={removeLink}
                  onEdit={startEditing}
                  onSave={saveEdit}
                  onCancel={cancelEdit}
                  isEditing={editingId === link.id}
                />
              ))
            )}
          </ul>
        </SortableContext>
      </DndContext>

      <div className="border-t border-gray-700 pt-4">
        <div className="text-gray-300 text-sm font-medium mb-2">Add New Link</div>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Link name"
            value={linkName}
            onChange={(e) => setLinkName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addLink()}
            className="w-full bg-input-bg border border-input-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://example.com"
              value={linkURL}
              onChange={(e) => setLinkURL(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addLink()}
              className="flex-1 bg-input-bg border border-input-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={addLink}
              disabled={!linkName.trim() || !linkURL.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LinksWidget() {
  // This component will be rendered on the client side only
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="glass-card rounded-2xl p-4 flex flex-col h-full widget-hover min-h-[200px] animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-4 bg-gray-700 rounded"></div>
          <div className="h-4 w-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return <ClientOnlyLinksWidget />;
}

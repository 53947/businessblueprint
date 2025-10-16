import { useState, useEffect, useRef } from "react";
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Plus, ListPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
}

interface TaskContextMenuProps {
  children: React.ReactNode;
}

export function TaskContextMenu({ children }: TaskContextMenuProps) {
  const [selectedText, setSelectedText] = useState("");
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [showAddToTaskDialog, setShowAddToTaskDialog] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Mock tasks - will be replaced with API call
    setTasks([
      { id: 1, title: "Setup Synup Integration", description: "Configure API keys and test", status: "in_progress" },
      { id: 2, title: "Design Client Dashboard", description: "", status: "pending" },
      { id: 3, title: "Implement Review Analytics", description: "Charts and metrics", status: "pending" },
    ]);
  }, []);

  const handleContextMenu = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim() || "";
    setSelectedText(text);
  };

  const handleCreateNewTask = () => {
    if (!selectedText) {
      toast({
        title: "No text selected",
        description: "Please highlight text before creating a task",
        variant: "destructive"
      });
      return;
    }
    setTaskTitle(selectedText.substring(0, 100)); // Limit title length
    setTaskDescription("");
    setShowNewTaskDialog(true);
  };

  const handleAddToExistingTask = (taskId: number) => {
    if (!selectedText) {
      toast({
        title: "No text selected",
        description: "Please highlight text before adding to a task",
        variant: "destructive"
      });
      return;
    }
    setSelectedTaskId(taskId);
    setShowAddToTaskDialog(true);
  };

  const saveNewTask = async () => {
    // API call to create task would go here
    // For now, just show success toast
    toast({
      title: "Task created",
      description: `Created task: "${taskTitle}"`,
    });
    
    // Add to local tasks list
    const newTask: Task = {
      id: tasks.length + 1,
      title: taskTitle,
      description: taskDescription + (selectedText ? `\n\nHighlighted text: "${selectedText}"` : ""),
      status: "pending"
    };
    setTasks([...tasks, newTask]);
    
    setShowNewTaskDialog(false);
    setTaskTitle("");
    setTaskDescription("");
    setSelectedText("");
  };

  const addToExistingTask = async () => {
    if (!selectedTaskId) return;
    
    const task = tasks.find(t => t.id === selectedTaskId);
    if (!task) return;

    // API call to update task would go here
    toast({
      title: "Task updated",
      description: `Added note to "${task.title}"`,
    });

    // Update local task
    setTasks(tasks.map(t => {
      if (t.id === selectedTaskId) {
        return {
          ...t,
          description: (t.description || "") + `\n\nAdded: "${selectedText}"`
        };
      }
      return t;
    }));

    setShowAddToTaskDialog(false);
    setSelectedTaskId(null);
    setSelectedText("");
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild onContextMenu={handleContextMenu}>
          <div className="contents">
            {children}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          {selectedText && (
            <>
              <ContextMenuItem 
                onClick={handleCreateNewTask}
                data-testid="context-menu-create-task"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Task
              </ContextMenuItem>
              
              <ContextMenuSub>
                <ContextMenuSubTrigger data-testid="context-menu-add-to-task">
                  <ListPlus className="mr-2 h-4 w-4" />
                  Add to Existing Task
                </ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-56">
                  {tasks.length === 0 ? (
                    <ContextMenuItem disabled>No tasks available</ContextMenuItem>
                  ) : (
                    tasks.map((task) => (
                      <ContextMenuItem 
                        key={task.id}
                        onClick={() => handleAddToExistingTask(task.id)}
                        data-testid={`context-menu-task-${task.id}`}
                      >
                        {task.title}
                      </ContextMenuItem>
                    ))
                  )}
                </ContextMenuSubContent>
              </ContextMenuSub>
              
              <ContextMenuSeparator />
            </>
          )}
          <ContextMenuItem disabled className="text-xs text-gray-500">
            {selectedText ? `Selected: "${selectedText.substring(0, 30)}..."` : "Right-click on highlighted text"}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {/* New Task Dialog */}
      <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
        <DialogContent data-testid="dialog-new-task">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Create a task from the highlighted text
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="task-title">Task Title</Label>
              <Input
                id="task-title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter task title"
                data-testid="input-task-title"
              />
            </div>
            
            <div>
              <Label htmlFor="task-description">Description</Label>
              <Textarea
                id="task-description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Additional notes (optional)"
                rows={4}
                data-testid="textarea-task-description"
              />
            </div>

            {selectedText && (
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Highlighted text:</p>
                <p className="text-sm font-medium">&ldquo;{selectedText}&rdquo;</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowNewTaskDialog(false)}
              data-testid="button-cancel-new-task"
            >
              Cancel
            </Button>
            <Button 
              onClick={saveNewTask}
              disabled={!taskTitle.trim()}
              data-testid="button-save-new-task"
            >
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add to Task Dialog */}
      <Dialog open={showAddToTaskDialog} onOpenChange={setShowAddToTaskDialog}>
        <DialogContent data-testid="dialog-add-to-task">
          <DialogHeader>
            <DialogTitle>Add to Task</DialogTitle>
            <DialogDescription>
              Add highlighted text to {tasks.find(t => t.id === selectedTaskId)?.title}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedText && (
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Adding to task:</p>
                <p className="text-sm font-medium">&ldquo;{selectedText}&rdquo;</p>
              </div>
            )}

            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                This text will be appended to the task notes
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowAddToTaskDialog(false)}
              data-testid="button-cancel-add-to-task"
            >
              Cancel
            </Button>
            <Button 
              onClick={addToExistingTask}
              data-testid="button-confirm-add-to-task"
            >
              Add to Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

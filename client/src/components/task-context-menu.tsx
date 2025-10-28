import { useState, useEffect } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface Task {
  id: number;
  title: string;
  description?: string | null;
  status: 'todo' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string | null;
  assignedBy?: string | null;
  dueDate?: string | null;
  tags?: string[] | null;
}

interface TaskContextMenuProps {
  children: React.ReactNode;
}

const PRIORITY_COLORS = {
  low: "bg-gray-500",
  medium: "bg-blue-500",
  high: "bg-orange-500",
  urgent: "bg-red-500"
};

const PRIORITY_LABELS = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent"
};

export function TaskContextMenu({ children }: TaskContextMenuProps) {
  const [selectedText, setSelectedText] = useState("");
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [showAddToTaskDialog, setShowAddToTaskDialog] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState<Task['priority']>("medium");
  const [taskAssignedTo, setTaskAssignedTo] = useState<string>("user");
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const { toast } = useToast();

  // Fetch tasks from API
  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ['/api/tasks'],
    enabled: true,
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: async (newTask: Partial<Task>) => {
      const response = await apiRequest('POST', '/api/tasks', newTask);
      return await response.json();
    },
    onSuccess: (data: Task) => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      
      // Show notification for assignment
      if (data.assignedTo) {
        toast({
          title: "Task assigned",
          description: `Task "${data.title}" assigned to ${data.assignedTo}`,
        });
      } else {
        toast({
          title: "Task created",
          description: `Created task: "${data.title}"`,
        });
      }
      
      setShowNewTaskDialog(false);
      setTaskTitle("");
      setTaskDescription("");
      setTaskPriority("medium");
      setTaskAssignedTo("user");
      setSelectedText("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<Task> }) => {
      const response = await apiRequest('PATCH', `/api/tasks/${id}`, updates);
      return await response.json();
    },
    onSuccess: (data: Task) => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      toast({
        title: "Task updated",
        description: `Updated task: "${data.title}"`,
      });
      setShowAddToTaskDialog(false);
      setSelectedTaskId(null);
      setSelectedText("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    },
  });

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
    setTaskPriority("medium");
    setTaskAssignedTo("user");
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
    if (!taskTitle.trim()) return;

    const newTask: Partial<Task> = {
      title: taskTitle,
      description: taskDescription + (selectedText ? `\n\nHighlighted text: "${selectedText}"` : ""),
      status: "todo",
      priority: taskPriority,
      assignedTo: taskAssignedTo,
      assignedBy: "user", // Could be dynamic based on current user
    };

    createTaskMutation.mutate(newTask);
  };

  const addToExistingTask = async () => {
    if (!selectedTaskId) return;
    
    const task = tasks.find(t => t.id === selectedTaskId);
    if (!task) return;

    const updatedDescription = (task.description || "") + `\n\nAdded: "${selectedText}"`;

    updateTaskMutation.mutate({
      id: selectedTaskId,
      updates: { description: updatedDescription }
    });
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
                        className="flex items-center justify-between"
                      >
                        <span className="truncate">{task.title}</span>
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${PRIORITY_COLORS[task.priority]} text-white text-xs px-1 py-0`}
                        >
                          {task.priority[0].toUpperCase()}
                        </Badge>
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
        <DialogContent data-testid="dialog-new-task" className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Create a task from the highlighted text
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="task-title">Task Title *</Label>
              <Input
                id="task-title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter task title"
                data-testid="input-task-title"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="task-priority">Priority</Label>
                <Select value={taskPriority} onValueChange={(value: Task['priority']) => setTaskPriority(value)}>
                  <SelectTrigger id="task-priority" data-testid="select-task-priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${PRIORITY_COLORS.low}`} />
                        {PRIORITY_LABELS.low}
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${PRIORITY_COLORS.medium}`} />
                        {PRIORITY_LABELS.medium}
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${PRIORITY_COLORS.high}`} />
                        {PRIORITY_LABELS.high}
                      </div>
                    </SelectItem>
                    <SelectItem value="urgent">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${PRIORITY_COLORS.urgent}`} />
                        {PRIORITY_LABELS.urgent}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="task-assigned-to">Assign To</Label>
                <Select value={taskAssignedTo} onValueChange={setTaskAssignedTo}>
                  <SelectTrigger id="task-assigned-to" data-testid="select-task-assigned-to">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">You (User)</SelectItem>
                    <SelectItem value="assistant">Assistant</SelectItem>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="task-description">Description</Label>
              <Textarea
                id="task-description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Additional notes (optional)"
                rows={3}
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
              disabled={!taskTitle.trim() || createTaskMutation.isPending}
              data-testid="button-save-new-task"
            >
              {createTaskMutation.isPending ? "Creating..." : "Create Task"}
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
              disabled={updateTaskMutation.isPending}
              data-testid="button-confirm-add-to-task"
            >
              {updateTaskMutation.isPending ? "Adding..." : "Add to Task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

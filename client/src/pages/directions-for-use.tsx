import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";
import { SectionHeader } from "@/components/section-header";
import { SideNav } from "@/components/side-nav";
import { AppIcon, ICON_MAP } from "@/components/app-name";
import { APP_REGISTRY, CONNECT_CRM } from "@/config/app-registry";
import { apiRequest, queryClient as qc } from "@/lib/queryClient";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle,
  Plus,
  Trash2,
  StickyNote,
  FileText,
  ArrowRight,
} from "lucide-react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface SubstepData {
  id: number;
  substepId: string | null;
  title: string;
  status: string;
  completedAt: string | null;
}

interface NoteData {
  id: number;
  content: string;
  isTodo: boolean;
  isCompleted: boolean;
}

interface TaskData {
  id: number;
  stepId: string;
  title: string;
  description: string | null;
  status: string;
  estimatedMinutes: number | null;
  completedAt: string | null;
  substeps: SubstepData[];
  notes: NoteData[];
}

interface SectionData {
  appId: string;
  appName: string;
  cadenceOrder: number;
  totalSteps: number;
  completedSteps: number;
  tasks: TaskData[];
  sectionNotes: NoteData[];
}

interface DirectionsResponse {
  progress: {
    totalTasks: number;
    completedTasks: number;
    percentage: number;
    phase: string;
  };
  sections: SectionData[];
}

// ─────────────────────────────────────────────
// Helper: get app config from registry
// ─────────────────────────────────────────────

function getAppConfig(appId: string) {
  if (appId === "connect") {
    return { name: CONNECT_CRM.name, color: CONNECT_CRM.color, icon: CONNECT_CRM.icon };
  }
  const app = APP_REGISTRY.find((a) => a.id === appId);
  if (app) {
    return { name: app.name, color: app.color, icon: app.icon };
  }
  return { name: appId, color: "#6B7280", icon: "FileText" };
}

// ─────────────────────────────────────────────
// Component: NoteItem
// ─────────────────────────────────────────────

function NoteItem({
  note,
  onUpdate,
  onDelete,
}: {
  note: NoteData;
  onUpdate: (id: number, data: any) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="flex items-start gap-2 bg-gray-50 border-l-2 border-gray-300 rounded-r-md p-2 ml-8">
      <StickyNote className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
      <span className="flex-1 text-sm text-gray-600">{note.content}</span>
      <button
        onClick={() => onDelete(note.id)}
        className="text-gray-400 hover:text-red-500 flex-shrink-0"
        aria-label="Delete note"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Component: AddNoteInput
// ─────────────────────────────────────────────

function AddNoteInput({
  onAdd,
}: {
  onAdd: (content: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 ml-8 mt-1"
      >
        <Plus className="w-3.5 h-3.5" />
        Add a note
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 ml-8 mt-1">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a note..."
        className="h-8 text-sm"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
          if (e.key === "Escape") {
            setIsOpen(false);
            setText("");
          }
        }}
        autoFocus
      />
      <Button size="sm" variant="ghost" onClick={handleSubmit} className="h-8 px-2">
        Save
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          setIsOpen(false);
          setText("");
        }}
        className="h-8 px-2 text-gray-400"
      >
        Cancel
      </Button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Component: StepRow
// ─────────────────────────────────────────────

function StepRow({
  task,
  isFirstIncomplete,
  appColor,
  onToggle,
  onSubstepToggle,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
}: {
  task: TaskData;
  isFirstIncomplete: boolean;
  appColor: string;
  onToggle: (id: number, currentStatus: string) => void;
  onSubstepToggle: (id: number, currentStatus: string) => void;
  onAddNote: (stepId: string, content: string) => void;
  onUpdateNote: (id: number, data: any) => void;
  onDeleteNote: (id: number) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(isFirstIncomplete);
  const isCompleted = task.status === "completed" || task.status === "skipped";

  return (
    <div
      className={`border rounded-lg ${
        isFirstIncomplete
          ? "border-l-4 bg-white"
          : isCompleted
          ? "border-gray-200 bg-white"
          : "border-gray-200 bg-white"
      }`}
      style={isFirstIncomplete ? { borderLeftColor: appColor } : undefined}
    >
      {/* Step header */}
      <div className="flex items-center gap-3 p-3">
        <Checkbox
          checked={isCompleted}
          onCheckedChange={() => onToggle(task.id, task.status)}
          className="h-5 w-5 min-w-[20px]"
        />
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 flex items-center gap-2 text-left min-w-0"
        >
          <span
            className={`font-medium text-sm ${
              isCompleted ? "text-gray-400 line-through" : "text-gray-900"
            }`}
          >
            {task.title}
          </span>
        </button>
        {task.estimatedMinutes && (
          <Badge variant="outline" className="text-xs flex-shrink-0">
            <Clock className="w-3 h-3 mr-1" />~{task.estimatedMinutes} min
          </Badge>
        )}
        {isCompleted && (
          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-shrink-0 p-1"
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-3 pb-3 space-y-2">
          {task.description && (
            <p className="text-sm text-gray-600 ml-8">{task.description}</p>
          )}

          {/* Substeps */}
          {task.substeps.length > 0 && (
            <div className="space-y-1 ml-8">
              {task.substeps.map((substep) => {
                const subCompleted =
                  substep.status === "completed" || substep.status === "skipped";
                return (
                  <div
                    key={substep.id}
                    className="flex items-center gap-2 py-1"
                  >
                    <Checkbox
                      checked={subCompleted}
                      onCheckedChange={() =>
                        onSubstepToggle(substep.id, substep.status)
                      }
                      className="h-4 w-4 min-w-[16px]"
                    />
                    <span
                      className={`text-sm ${
                        subCompleted
                          ? "text-gray-400 line-through"
                          : "text-gray-700"
                      }`}
                    >
                      {substep.title}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Step notes */}
          {task.notes.length > 0 && (
            <div className="space-y-1 mt-2">
              {task.notes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onUpdate={onUpdateNote}
                  onDelete={onDeleteNote}
                />
              ))}
            </div>
          )}

          {/* Add note */}
          <AddNoteInput
            onAdd={(content) => onAddNote(task.stepId, content)}
          />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Component: AppSection
// ─────────────────────────────────────────────

function AppSection({
  section,
  isActive,
  isFuture,
  onToggleTask,
  onToggleSubstep,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  onAddSectionNote,
}: {
  section: SectionData;
  isActive: boolean;
  isFuture: boolean;
  onToggleTask: (id: number, currentStatus: string) => void;
  onToggleSubstep: (id: number, currentStatus: string) => void;
  onAddNote: (appId: string, stepId: string, content: string) => void;
  onUpdateNote: (id: number, data: any) => void;
  onDeleteNote: (id: number) => void;
  onAddSectionNote: (appId: string, content: string) => void;
}) {
  const allCompleted =
    section.totalSteps > 0 && section.completedSteps === section.totalSteps;
  const [isOpen, setIsOpen] = useState(isActive);
  const config = getAppConfig(section.appId);

  // Find first incomplete step for highlighting
  const firstIncompleteStep = section.tasks.find(
    (t) => t.status !== "completed" && t.status !== "skipped"
  );

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className={isFuture ? "opacity-70" : ""}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            {/* App icon */}
            <AppIcon name={config.icon} size={36} color={config.color} />

            {/* App name */}
            <div className="flex-1 text-left">
              <span
                className="font-semibold text-base"
                style={{ fontFamily: "Archivo Semi Expanded, Archivo, sans-serif" }}
              >
                <span style={{ color: "#09080E" }}>/ </span>
                <span style={{ color: config.color }}>{config.name}</span>
              </span>
            </div>

            {/* Completion badge */}
            {allCompleted ? (
              <Badge className="bg-green-100 text-green-700 border-green-200">
                <CheckCircle className="w-3.5 h-3.5 mr-1" />
                Complete
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs">
                {section.completedSteps}/{section.totalSteps} steps
              </Badge>
            )}

            {/* Expand/collapse arrow */}
            {isOpen ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="space-y-2 mt-2 pl-2">
            {section.tasks.map((task) => (
              <StepRow
                key={task.id}
                task={task}
                isFirstIncomplete={task.id === firstIncompleteStep?.id}
                appColor={config.color}
                onToggle={onToggleTask}
                onSubstepToggle={onToggleSubstep}
                onAddNote={(stepId, content) =>
                  onAddNote(section.appId, stepId, content)
                }
                onUpdateNote={onUpdateNote}
                onDeleteNote={onDeleteNote}
              />
            ))}

            {/* Section-level notes */}
            {section.sectionNotes.length > 0 && (
              <div className="space-y-1 mt-3">
                {section.sectionNotes.map((note) => (
                  <NoteItem
                    key={note.id}
                    note={note}
                    onUpdate={onUpdateNote}
                    onDelete={onDeleteNote}
                  />
                ))}
              </div>
            )}

            {/* Add section note */}
            <AddNoteInput
              onAdd={(content) => onAddSectionNote(section.appId, content)}
            />
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────

export default function DirectionsForUse() {
  const [, setLocation] = useLocation();
  const [clientId, setClientId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "notes">("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const storedClientId = sessionStorage.getItem("clientId");
    if (!storedClientId) {
      setLocation("/portal/login");
      return;
    }
    setClientId(storedClientId);
  }, [setLocation]);

  const { data, isLoading, error } = useQuery<DirectionsResponse>({
    queryKey: ["/api/setup-tasks/directions-for-use"],
    enabled: !!clientId,
  });

  const handleSignOut = () => {
    sessionStorage.removeItem("clientId");
    sessionStorage.removeItem("externalId");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("clientName");
    setLocation("/portal/login");
  };

  // ── Mutations ──

  const toggleTaskMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const newStatus = status === "completed" ? "pending" : "completed";
      return apiRequest("PATCH", `/api/setup-tasks/${id}`, { status: newStatus });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/setup-tasks/directions-for-use"] });
    },
  });

  const addNoteMutation = useMutation({
    mutationFn: async (data: { appId: string; stepId?: string; content: string }) => {
      return apiRequest("POST", "/api/setup-notes", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/setup-tasks/directions-for-use"] });
      toast({ title: "Note added" });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/setup-notes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/setup-tasks/directions-for-use"] });
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: async ({ id, ...data }: { id: number; [key: string]: any }) => {
      return apiRequest("PATCH", `/api/setup-notes/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/setup-tasks/directions-for-use"] });
    },
  });

  // ── Handlers ──

  const handleToggleTask = (id: number, currentStatus: string) => {
    toggleTaskMutation.mutate({ id, status: currentStatus });
  };

  const handleAddNote = (appId: string, stepId: string, content: string) => {
    addNoteMutation.mutate({ appId, stepId, content });
  };

  const handleAddSectionNote = (appId: string, content: string) => {
    addNoteMutation.mutate({ appId, content });
  };

  const handleUpdateNote = (id: number, data: any) => {
    updateNoteMutation.mutate({ id, ...data });
  };

  const handleDeleteNote = (id: number) => {
    deleteNoteMutation.mutate(id);
  };

  // ── Determine active app ──

  const sections = data?.sections || [];
  const firstIncompleteSection = sections.find(
    (s) => s.completedSteps < s.totalSteps
  );

  // ── Loading state ──

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header showNavigation={true} />
        <div className="flex flex-1">
          <SideNav
            activeTab="directions-for-use"
            onSignOut={handleSignOut}
          />
          <div className="flex-1 p-6 lg:p-8 space-y-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-full max-w-md" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // ── Empty state ──

  const isEmpty = !data || data.progress.totalTasks === 0;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header showNavigation={true} />
      <SectionHeader
        title="Directions for Use"
        subtitle="Your guided setup journey"
        showHomeButton={true}
        homeRoute="/portal"
      />

      <div className="flex flex-1">
        <SideNav
          activeTab="directions-for-use"
          onSignOut={handleSignOut}
        />

        <main className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            {/* Header Banner */}
            <div className="mb-8">
              <h1
                className="text-2xl sm:text-3xl font-bold tracking-wide uppercase text-gray-900 mb-1"
                style={{ fontFamily: "Archivo Semi Expanded, Archivo, sans-serif" }}
              >
                Directions for Use
              </h1>
              <p className="text-gray-500 text-sm">
                Your step-by-step guide to setting up your digital presence
              </p>
            </div>

            {isEmpty ? (
              /* Empty state */
              <Card className="border border-gray-200">
                <CardContent className="p-8 text-center">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Your Directions for Use will appear here after your assessment is complete.
                  </h2>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Complete a Digital IQ Assessment to receive your personalized prescription,
                    then generate your step-by-step setup plan.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild variant="outline">
                      <Link href="/assessment">
                        Start Your Assessment
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/portal/prescriptions">
                        View Your Prescriptions
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Progress bar */}
                <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Overall Progress
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {data!.progress.percentage}%
                    </span>
                  </div>
                  <Progress value={data!.progress.percentage} className="h-2.5" />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">
                      {data!.progress.completedTasks} of {data!.progress.totalTasks} steps complete
                    </span>
                    {data!.progress.phase === "complete" && (
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Setup Complete
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Filter toggle */}
                <div className="flex gap-2 mb-4">
                  <Button
                    size="sm"
                    variant={filter === "all" ? "default" : "outline"}
                    onClick={() => setFilter("all")}
                    className={
                      filter === "all"
                        ? "bg-gray-900 text-white"
                        : ""
                    }
                  >
                    All Steps
                  </Button>
                  <Button
                    size="sm"
                    variant={filter === "notes" ? "default" : "outline"}
                    onClick={() => setFilter("notes")}
                    className={
                      filter === "notes"
                        ? "bg-gray-900 text-white"
                        : ""
                    }
                  >
                    <StickyNote className="w-3.5 h-3.5 mr-1" />
                    My Notes Only
                  </Button>
                </div>

                {/* Sections */}
                {filter === "all" ? (
                  <div className="space-y-3">
                    {sections.map((section) => {
                      const isActive =
                        section.appId === firstIncompleteSection?.appId;
                      const allDone =
                        section.totalSteps > 0 &&
                        section.completedSteps === section.totalSteps;
                      const isFuture =
                        !isActive &&
                        !allDone &&
                        firstIncompleteSection &&
                        section.cadenceOrder > firstIncompleteSection.cadenceOrder;

                      return (
                        <AppSection
                          key={section.appId}
                          section={section}
                          isActive={isActive}
                          isFuture={!!isFuture}
                          onToggleTask={handleToggleTask}
                          onToggleSubstep={handleToggleTask}
                          onAddNote={handleAddNote}
                          onUpdateNote={handleUpdateNote}
                          onDeleteNote={handleDeleteNote}
                          onAddSectionNote={handleAddSectionNote}
                        />
                      );
                    })}
                  </div>
                ) : (
                  /* My Notes Only view */
                  <div className="space-y-4">
                    {sections
                      .filter(
                        (s) =>
                          s.sectionNotes.length > 0 ||
                          s.tasks.some((t) => t.notes.length > 0)
                      )
                      .map((section) => {
                        const config = getAppConfig(section.appId);
                        const allNotes = [
                          ...section.tasks.flatMap((t) =>
                            t.notes.map((n) => ({
                              ...n,
                              stepTitle: t.title,
                            }))
                          ),
                          ...section.sectionNotes.map((n) => ({
                            ...n,
                            stepTitle: null as string | null,
                          })),
                        ];

                        if (allNotes.length === 0) return null;

                        return (
                          <div key={section.appId}>
                            <div className="flex items-center gap-2 mb-2">
                              <AppIcon
                                name={config.icon}
                                size={24}
                                color={config.color}
                              />
                              <span
                                className="font-semibold text-sm"
                                style={{
                                  fontFamily:
                                    "Archivo Semi Expanded, Archivo, sans-serif",
                                }}
                              >
                                <span style={{ color: "#09080E" }}>/ </span>
                                <span style={{ color: config.color }}>
                                  {config.name}
                                </span>
                              </span>
                            </div>
                            <div className="space-y-1 ml-8">
                              {allNotes.map((note) => (
                                <div
                                  key={note.id}
                                  className="flex items-start gap-2 bg-gray-50 border-l-2 border-gray-300 rounded-r-md p-2"
                                >
                                  <StickyNote className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                  <div className="flex-1">
                                    <span className="text-sm text-gray-600">
                                      {note.content}
                                    </span>
                                    {note.stepTitle && (
                                      <span className="text-xs text-gray-400 block mt-0.5">
                                        on: {note.stepTitle}
                                      </span>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => handleDeleteNote(note.id)}
                                    className="text-gray-400 hover:text-red-500 flex-shrink-0"
                                    aria-label="Delete note"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    {sections.every(
                      (s) =>
                        s.sectionNotes.length === 0 &&
                        s.tasks.every((t) => t.notes.length === 0)
                    ) && (
                      <Card className="border border-gray-200">
                        <CardContent className="p-8 text-center">
                          <StickyNote className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500">
                            No notes yet. Add notes to any step by expanding it and clicking "Add a note."
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

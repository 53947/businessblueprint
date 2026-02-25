import { CheckCircle2, Clock, AlertCircle, Minus } from "lucide-react";

interface DirectoryStatusBadgeProps {
  name: string;
  status: "active" | "pending" | "error" | "not_listed";
}

const statusConfig = {
  active: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50 border-green-200" },
  pending: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200" },
  error: { icon: AlertCircle, color: "text-red-600", bg: "bg-red-50 border-red-200" },
  not_listed: { icon: Minus, color: "text-gray-400", bg: "bg-gray-50 border-gray-200" },
};

export function DirectoryStatusBadge({ name, status }: DirectoryStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${config.bg}`}>
      <Icon className={`w-3.5 h-3.5 ${config.color}`} />
      <span className="text-gray-700">{name}</span>
    </div>
  );
}

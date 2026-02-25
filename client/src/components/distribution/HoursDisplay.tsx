interface HoursData {
  [day: string]: { open: string; close: string } | null;
}

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const DAY_LABELS: Record<string, string> = {
  monday: "Mon", tuesday: "Tue", wednesday: "Wed", thursday: "Thu",
  friday: "Fri", saturday: "Sat", sunday: "Sun",
};

function formatTime(t: string): string {
  const [h, m] = t.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const display = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${display}:${m} ${ampm}`;
}

interface HoursDisplayProps {
  hours: HoursData | null | undefined;
}

export function HoursDisplay({ hours }: HoursDisplayProps) {
  if (!hours) {
    return <p className="text-sm text-gray-500 italic">No hours set</p>;
  }

  return (
    <div className="grid grid-cols-[60px_1fr] gap-y-1 text-sm">
      {DAYS.map((day) => {
        const entry = hours[day];
        return (
          <div key={day} className="contents">
            <span className="font-medium text-gray-600">{DAY_LABELS[day]}</span>
            <span className="text-gray-900">
              {entry ? `${formatTime(entry.open)} - ${formatTime(entry.close)}` : "Closed"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

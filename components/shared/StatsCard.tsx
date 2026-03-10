import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  className?: string;
}

export default function StatsCard({
  label,
  value,
  change,
  icon,
  className,
}: StatsCardProps) {
  const isPositive = change >= 0;

  return (
    <Card className={cn("overflow-hidden border-gray-100 shadow-sm", className)}>
      <CardContent className="flex items-center gap-4 p-5">
        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-blue-600">
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="truncate text-xs font-medium uppercase tracking-wider text-gray-500">
            {label}
          </p>
          <p className="mt-0.5 text-2xl font-bold text-navy-900">
            {typeof value === "number" ? value.toLocaleString("es-AR") : value}
          </p>
        </div>

        {/* Change indicator */}
        <div
          className={cn(
            "flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-semibold",
            isPositive
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-500"
          )}
        >
          {isPositive ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
          {Math.abs(change).toFixed(1)}%
        </div>
      </CardContent>
    </Card>
  );
}

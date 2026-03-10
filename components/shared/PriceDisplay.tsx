import { formatPrice } from "@/lib/utils/formatters";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Tag } from "lucide-react";

interface PriceDisplayProps {
  amount: number;
  currency: "ARS" | "USD";
  originalAmount?: number;
  consultPrice?: boolean;
  financing?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function PriceDisplay({
  amount,
  currency,
  originalAmount,
  consultPrice = false,
  financing = false,
  className,
  size = "md",
}: PriceDisplayProps) {
  if (consultPrice) {
    return (
      <div className={cn("flex flex-col gap-1", className)}>
        <Badge
          variant="secondary"
          className="w-fit bg-amber-50 text-amber-700 hover:bg-amber-100"
        >
          <Tag className="mr-1 h-3 w-3" />
          Consultar precio
        </Badge>
        {financing && <FinancingBadge />}
      </div>
    );
  }

  const discount =
    originalAmount && originalAmount > amount
      ? Math.round(((originalAmount - amount) / originalAmount) * 100)
      : null;

  const sizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            "font-bold text-navy-900",
            sizeClasses[size]
          )}
        >
          {formatPrice(amount, currency)}
        </span>

        {originalAmount && originalAmount > amount && (
          <span className="text-sm text-gray-400 line-through">
            {formatPrice(originalAmount, currency)}
          </span>
        )}

        {discount && (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
            -{discount}%
          </Badge>
        )}
      </div>

      {financing && <FinancingBadge />}
    </div>
  );
}

function FinancingBadge() {
  return (
    <Badge
      variant="outline"
      className="w-fit border-blue-200 bg-blue-50 text-blue-700"
    >
      <CreditCard className="mr-1 h-3 w-3" />
      Financiaci\u00f3n disponible
    </Badge>
  );
}

"use client";

import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";

interface StatisticCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;

  className?: string;

  iconClassName?: string;

  footer?: React.ReactNode;
}

function StatisticCard({
  title,
  value,
  icon: Icon,
  className,
  iconClassName,
  footer,
}: StatisticCardProps) {
  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className,
      )}
    >
      <CardContent className="flex h-full flex-col justify-between gap-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight">{value}</h2>
          </div>

          <div className={cn("rounded-xl bg-primary/10 p-3", iconClassName)}>
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>

        {footer && (
          <div className="text-xs text-muted-foreground">{footer}</div>
        )}
      </CardContent>
    </Card>
  );
}

export default StatisticCard;

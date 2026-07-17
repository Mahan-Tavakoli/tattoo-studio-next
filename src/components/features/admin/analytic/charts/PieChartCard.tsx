"use client";

import { Pie, PieChart, Label } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import ChartCard from "./ChartCard";
import { ChartItem } from "@/components/schema & types/analytics/chart.types";

interface PieChartCardProps {
  title: string;
  description?: string;

  data: ChartItem[];

  config: ChartConfig;
}

function PieChartCard({ title, description, data, config }: PieChartCardProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (!data.length) {
    return (
      <ChartCard title={title} description={description}>
        <div className="flex h-80 items-center justify-center text-sm text-muted-foreground">
          No data available
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title={title} description={description}>
      <ChartContainer config={config} className="mx-auto h-85 w-full">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={80}
            outerRadius={115}
            strokeWidth={5}
            isAnimationActive
          >
            <Label
              position="center"
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        className="fill-foreground text-4xl font-bold"
                      >
                        {total}
                      </tspan>

                      <tspan
                        x={viewBox.cx}
                        dy={28}
                        className="fill-muted-foreground text-sm"
                      >
                        Total
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>

          <ChartLegend
            verticalAlign="bottom"
            content={<ChartLegendContent />}
          />
        </PieChart>
      </ChartContainer>
    </ChartCard>
  );
}

export default PieChartCard;

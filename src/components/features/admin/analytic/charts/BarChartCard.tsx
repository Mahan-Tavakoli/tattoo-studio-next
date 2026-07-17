"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

import ChartCard from "./ChartCard";
import { ChartItem } from "@/components/schema & types/analytics/chart.types";

interface BarChartCardProps {
  title: string;
  description?: string;
  data: ChartItem[];
  config: ChartConfig;
}

function BarChartCard({ title, description, data, config }: BarChartCardProps) {
  return (
    <ChartCard title={title} description={description}>
      <ChartContainer config={config} className="h-85 w-full">
        <BarChart
          accessibilityLayer
          data={data}
          margin={{
            top: 25,
            left: 10,
            right: 10,
          }}
        >
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => (config[value]?.label as string) ?? value}
          />

          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

          <Bar dataKey="value" radius={8}>
            <LabelList dataKey="value" position="top" />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}

export default BarChartCard;

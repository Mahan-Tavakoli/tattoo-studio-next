import { ChartConfig } from "@/components/ui/chart";

export interface ChartItem {
  name: string;
  value: number;
  fill?: string;
}

export interface ChartCardProps {
  title: string;
  description?: string;
}

export interface PieChartCardProps extends ChartCardProps {
  data: ChartItem[];
  config: ChartConfig;
}

export interface BarChartCardProps extends ChartCardProps {
  data: ChartItem[];
  config: ChartConfig;
}

"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  person: {
    label: "Coach",
    color: "hsl(0, 0%, 41%)",
  },
  label: {
    color: "hsl(0, 12%, 100%)",
  },
};

export function BarrChart({ data, title, yAxisKey, barKey }: {
  data: any, title: string, yAxisKey: string, barKey: string}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            width={400}
            height={200}
            data={data}
            layout="vertical"
            margin={{bottom: 20}}
            barSize={30}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey={yAxisKey}
              type="category"
              tickLine={false}
              tickMargin={20}
              axisLine={false}
              tickFormatter={(value) => value.toString().slice(0, 3)}
            />
            <XAxis type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey={barKey}
              fill={chartConfig.person.color}
              radius={4}
            >
              <LabelList
                dataKey={yAxisKey}
                position="insideLeft"
                offset={2}
                className="fill-[--color-label]"
                fontSize={11}
              />
              <LabelList
                dataKey={barKey}
                position="right"
                offset={2}
                className="fill-foreground"
                fontSize={11}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}


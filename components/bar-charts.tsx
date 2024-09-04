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

export function BarrChart({ data, title, description }: any) {
  const chartConfig = {
    person: {
      label: "Coach",
      color: "hsl(0, 0%, 41%)",
    },
    label: {
      color: "hsl(0, 12%, 100%)",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            width={800}
            height={400}
            data={data}
            layout="vertical"
            margin={{right: 80 }}
            barSize={60}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="coach"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <XAxis type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="value"
              fill={chartConfig.person.color}
              radius={8}
            >
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={16}
              />
              <LabelList
                dataKey="value"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={16}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          [Example] Observation <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          [Example] Showing each coaches evaluation for the last 6 months.
        </div>
      </CardFooter>
    </Card>
  );
}

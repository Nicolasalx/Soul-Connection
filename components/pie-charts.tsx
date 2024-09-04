"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A simple pie chart"

const chartConfig = {
  chrome: {
    label: "Chrome",
    color: "hsl(0, 0%, 41%)",
  },
  safari: {
    label: "Safari",
    color: "hsl(330, 100%, 71%)",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(30, 100%, 85%)",
  },
  edge: {
    label: "Edge",
    color: "hsl(120, 73%, 75%)",
  },
  other: {
    label: "Other",
    color: "hsl(0, 0%, 83%)",
  },
} satisfies ChartConfig

export function PiieChart({data, title, description}: any) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>[Example] Pie Chart</CardTitle>
        <CardDescription>[Example] January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={data} dataKey="value" nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          [Example] Observation <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          [Example] ...
        </div>
      </CardFooter>
    </Card>
  )
}


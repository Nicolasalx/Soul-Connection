'use client'
import {TrendingUp} from "lucide-react"
import {CartesianGrid, Line, LineChart, XAxis} from "recharts"
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

export const description = "A line chart with dots"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(0, 0%, 41%)",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function DotChart({data, title, description}: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>[Example] Line Chart - Dots</CardTitle>
        <CardDescription>[Example] January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="px-5">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="value"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          [Example Observation] <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          [Example]
        </div>
      </CardFooter>
    </Card>
  )
}
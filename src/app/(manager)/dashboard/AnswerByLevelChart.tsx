"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useGetWeeklyAnswerByLevelQuery } from "@/queries/useStatistics";

const chartConfig = {
  number: {
    label: "Number Answer   ",
  },
  a1: {
    label: "A1",
    color: "hsl(var(--chart-1))",
  },
  a2: {
    label: "A2",
    color: "hsl(var(--chart-2))",
  },
  b1: {
    label: "B1",
    color: "hsl(var(--chart-3))",
  },
  b2: {
    label: "B2",
    color: "hsl(var(--chart-4))",
  },
  c1: {
    label: "C1",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function AnswerByLevelChart() {
  let chartData: any[] | undefined = undefined;

  const { data } = useGetWeeklyAnswerByLevelQuery();

  if (data?.payload.data) {
    chartData = [
      {
        browser: "a1",
        number: data?.payload.data[0].total_answers,
        fill: "var(--color-a1)",
      },
      {
        browser: "a2",
        number: data?.payload.data[1].total_answers,
        fill: "var(--color-a2)",
      },
      {
        browser: "b1",
        number: data?.payload.data[2].total_answers,
        fill: "var(--color-b1)",
      },
      {
        browser: "b2",
        number: data?.payload.data[3].total_answers,
        fill: "var(--color-b2)",
      },
      {
        browser: "c1",
        number: data?.payload.data[4].total_answers,
        fill: "var(--color-c1)",
      },
    ];
  }

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Pie Chart - Label List</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="number" hideLabel />}
              />
              <Pie data={chartData} dataKey="number">
                <LabelList
                  dataKey="browser"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) =>
                    chartConfig[value]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

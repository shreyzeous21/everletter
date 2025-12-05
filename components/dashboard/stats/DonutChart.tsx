"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DonutChartProps {
  title: string;
  value: number;
  color?: string;
  centerLabel?: string;
}

export default function DonutChart({
  title,
  value,
  color = "#4f46e5", // default indigo
  centerLabel = "Total",
}: DonutChartProps) {
  const chartData = [{ name: title, value }];

  return (
    <Card className="border border-primary shadow-md">
      <CardHeader className="border-b border-primary">
        <CardTitle className="flex items-center justify-between">
          {title}
          <Badge variant="default">{value}</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative flex justify-center items-center h-[250px]">
        {/* Center Content */}
        <div className="absolute text-center">
          <h2 className="text-3xl font-bold">{value}</h2>
          <p className="text-sm text-muted-foreground">{centerLabel}</p>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              data={chartData}
              innerRadius={70}
              outerRadius={100}
              stroke="none"
            >
              <Cell fill={color} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

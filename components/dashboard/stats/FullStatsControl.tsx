"use client";
import CardWrapper from "../CardWrapper";
import { useChart } from "@/hooks/use-chart";
import DonutChart from "./DonutChart";
import { Badge } from "@/components/ui/badge";

export default function FullStatsControl() {
  const { totalSubscriptions, totalUsers, totalTemplates } = useChart();

  const totalRevenue = totalSubscriptions?.reduce((acc, subscription) => {
    return acc + (subscription.payment?.amount ?? 0);
  }, 0);

  return (
    <CardWrapper title="Stats" className="">
      <div className="flex items-center p-4 gap-4">
        <h2 className="text-lg font-bold">Total Revenue</h2>
        <Badge variant="outline" className="border-primary animate-pulse">
          ${totalRevenue?.toLocaleString() || 0}
        </Badge>
      </div>
      <div className="grid lg:grid-cols-3 gap-4 p-4">
        <DonutChart
          title="Total Subscriptions"
          value={totalSubscriptions?.length || 0}
          color="#82ca9d"
          centerLabel="Subscriptions"
        />
        <DonutChart
          title="Total Users"
          value={totalUsers?.length || 0}
          color="#4f46e5"
          centerLabel="Users"
        />
        <DonutChart
          title="Total Templates"
          value={totalTemplates?.length || 0}
          color="#82ca9d"
          centerLabel="Total Templates"
        />
      </div>
    </CardWrapper>
  );
}

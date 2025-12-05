import FullStatsControl from "@/components/dashboard/stats/FullStatsControl";
import { getServerAuth } from "@/lib/getServerSession";
import React from "react";

export default async function page() {
  await getServerAuth();
  return <FullStatsControl />;
}

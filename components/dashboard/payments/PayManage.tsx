"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardWrapper from "../CardWrapper";
import PaymentsTable from "./PaymentsTable";

export default function PayManage() {
  return (
    <CardWrapper title="Payments">
      <Tabs defaultValue="all" className="p-4">
        <TabsList>
          <TabsTrigger value="all">All Payments</TabsTrigger>
          <TabsTrigger value="logs">Payments Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <PaymentsTable type="all" />
        </TabsContent>

        <TabsContent value="logs">
          <PaymentsTable type="logs" />
        </TabsContent>
      </Tabs>
    </CardWrapper>
  );
}

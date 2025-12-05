import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useChart } from "@/hooks/use-chart";
import { useRazorpay } from "@/hooks/use-razorpay";
import { format } from "date-fns";

export default function PaymentsTable({ type }: { type?: "all" | "logs" }) {
  const { totalSubscriptions } = useChart();
  const { getPaymentsLogsQuery } = useRazorpay();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>

          {type === "all" && <TableHead>Plan</TableHead>}
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {type === "all" ? (
          <>
            {totalSubscriptions?.map((subscription: any) => {
              return (
                <TableRow key={subscription.id}>
                  <TableCell>{subscription.user.name}</TableCell>
                  <TableCell>{subscription.payment?.amount}</TableCell>
                  <TableCell>{subscription?.status}</TableCell>
                  <TableCell>{subscription.plan}</TableCell>
                  <TableCell>
                    {format(subscription.startDate, "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(subscription.endDate, "dd/MM/yyyy")}
                  </TableCell>
                </TableRow>
              );
            })}
          </>
        ) : (
          <>
            {getPaymentsLogsQuery.data?.map((payment: any) => {
              return (
                <TableRow key={payment.id}>
                  <TableCell>{payment.user.name}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                  <TableCell>
                    {format(payment.createdAt, "dd/MM/yyyy")}
                  </TableCell>
                </TableRow>
              );
            })}
          </>
        )}
      </TableBody>
    </Table>
  );
}

import {
  getTotalSubscriptions,
  getTotalTemplate,
  getTotalUsers,
} from "@/actions/chart-action";
import { useQuery } from "@tanstack/react-query";

export const useChart = () => {
  const { data: totalUsers } = useQuery({
    queryKey: ["total-users"],
    queryFn: async () => await getTotalUsers(),
    staleTime: 0, // 0 seconds global stale time - for production
  });

  const { data: totalSubscriptions } = useQuery({
    queryKey: ["total-subscriptions"],
    queryFn: async () => await getTotalSubscriptions(),
    staleTime: 0, // 0 seconds global stale time - for production
  });

  const { data: totalTemplates } = useQuery({
    queryKey: ["total-templates"],
    queryFn: async () => await getTotalTemplate(),
    staleTime: 0, // 0 seconds global stale time - for production
  });
  return { totalUsers, totalSubscriptions, totalTemplates };
};

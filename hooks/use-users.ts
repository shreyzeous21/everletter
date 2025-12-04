"use client";

import {
  changeUserRole,
  deleteUser,
  getAllUsers,
  toggleBanUser,
  toggleWebsitePermission,
} from "@/actions/users-action";
import { Role } from "@/lib/generated/prisma/enums";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUsers = () => {
  const queryClient = useQueryClient();

  // Fetch all users
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await getAllUsers(),
  });

  // Ban toggle
  const toggleBanUserMutation = useMutation({
    mutationKey: ["toggle-ban-user"],
    mutationFn: async (id: string) => await toggleBanUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Ban status updated.");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update ban status.");
    },
  });

  // Website permission toggle
  const toggleWebsitePermissionMutation = useMutation({
    mutationKey: ["toggle-permission"],
    mutationFn: async (id: string) => await toggleWebsitePermission(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Website permission updated.");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update website permission.");
    },
  });

  // Delete user
  const deleteUserMutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async (id: string) => await deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully.");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete user.");
    },
  });

  // Change user role
  const changeUserRoleMutation = useMutation({
    mutationKey: ["change-user-role"],
    mutationFn: async ({ id, role }: { id: string; role: Role }) =>
      await changeUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User role changed successfully.");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to change user role.");
    },
  });

  return {
    users: users ?? [],
    isLoading,
    error,
    toggleBanUserMutation,
    toggleWebsitePermissionMutation,
    deleteUserMutation,
    changeUserRoleMutation,
  };
};

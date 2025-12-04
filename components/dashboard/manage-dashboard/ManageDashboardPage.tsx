"use client";

import CardWrapper from "../CardWrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/hooks/use-users";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CheckCircle2Icon, Trash2Icon, XCircleIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role } from "@/lib/generated/prisma/enums";

export default function ManageDashboardPage() {
  const {
    users,
    isLoading,
    error,
    toggleBanUserMutation,
    toggleWebsitePermissionMutation,
    deleteUserMutation,
    changeUserRoleMutation,
  } = useUsers();

  return (
    <CardWrapper title="Manage Dashboard">
      <Table>
        <TableHeader>
          <TableRow className="bg-background">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Pro User</TableHead>
            <TableHead>Web Permission</TableHead>
            <TableHead>Ban</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-6 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16" />
                </TableCell>
              </TableRow>
            ))}

          {error && !isLoading && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-red-500">
                Failed to load users.
              </TableCell>
            </TableRow>
          )}

          {!isLoading && !error && users.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                No users found.
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            !error &&
            users.length > 0 &&
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.role.toString()}
                    onValueChange={(value) =>
                      changeUserRoleMutation.mutate({
                        id: user.id,
                        role: value as Role,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Role.SUPERADMIN}>
                        Super Admin
                      </SelectItem>
                      <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                      <SelectItem value={Role.USER}>User</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {user.subscriptions.length > 0 ? (
                    <CheckCircle2Icon className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircleIcon className="h-4 w-4 text-red-500" />
                  )}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={user.hasWebsitePermission}
                    disabled={toggleWebsitePermissionMutation.isPending}
                    onCheckedChange={() =>
                      toggleWebsitePermissionMutation.mutate(user.id)
                    }
                  />
                </TableCell>

                <TableCell>
                  <Switch
                    checked={user.isBanned}
                    disabled={toggleBanUserMutation.isPending}
                    onCheckedChange={() =>
                      toggleBanUserMutation.mutate(user.id)
                    }
                  />
                </TableCell>

                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteUserMutation.mutate(user.id)}
                    disabled={deleteUserMutation.isPending}
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </CardWrapper>
  );
}

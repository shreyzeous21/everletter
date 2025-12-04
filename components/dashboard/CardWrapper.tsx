import { BellDotIcon } from "lucide-react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";

export default function CardWrapper({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="h-[calc(100svh-1rem)] flex flex-col gap-2 ">
      {/* Header */}
      <div className="flex items-center w-full gap-4 justify-between">
        <SidebarTrigger />

        <div className="flex w-full items-center gap-3">
          <h1 className="text-lg font-semibold text-primary">{title}</h1>
          <div className="h-px w-24 bg-border" />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-accent">
              <BellDotIcon className="size-4" />
              <span className="sr-only">Notifications</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm mb-3">Notifications</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                <div className="flex gap-3 p-2 rounded-md hover:bg-accent cursor-pointer">
                  <div className="flex-1">
                    <p className="text-sm font-medium">New message received</p>
                    <p className="text-xs text-muted-foreground">
                      You have a new message from John Doe
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      2 minutes ago
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-2 rounded-md hover:bg-accent cursor-pointer">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Profile update</p>
                    <p className="text-xs text-muted-foreground">
                      Your profile has been successfully updated
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      1 hour ago
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-2 rounded-md hover:bg-accent cursor-pointer">
                  <div className="flex-1">
                    <p className="text-sm font-medium">System maintenance</p>
                    <p className="text-xs text-muted-foreground">
                      Scheduled maintenance will occur tonight at 2 AM
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      3 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-2 rounded-md hover:bg-accent cursor-pointer">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Welcome!</p>
                    <p className="text-xs text-muted-foreground">
                      Welcome to Everletter. Get started by exploring the
                      dashboard.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      1 day ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto rounded-md border border-border bg-card  shadow-md">
        {children}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import CardWrapper from "../CardWrapper";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTemplate } from "@/hooks/use-template";
import { Button } from "@/components/ui/button";
import {
  DeleteIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  PlusIcon,
  PencilIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

export default function TemplateManager() {
  const {
    getAllTemplatesQuery,
    deleteTemplateMutation,
    toggleProMutation,
    togglePublishMutation,
  } = useTemplate();
  const templates = getAllTemplatesQuery.data;

  const [search, setSearch] = useState("");
  const filteredTemplates = templates?.filter((template) =>
    template.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <CardWrapper title="Templates">
      <div className="p-4 border-b flex items-center gap-2 justify-between">
        <Input
          placeholder="Search templates by name"
          className="w-auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link
          href="/dashboard/templates/add-template"
          className="flex items-center gap-2"
        >
          <Button variant="outline" size="sm">
            <PlusIcon className="w-4 h-4" />
            Create Template
          </Button>
        </Link>
      </div>
      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-background">
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Pro Only</TableHead>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTemplates?.map((template) => (
              <TableRow key={template.id}>
                <TableCell>{template.name}</TableCell>
                <TableCell>{template.category}</TableCell>
                <TableCell>
                  <Switch
                    checked={template.proOnly}
                    onCheckedChange={() =>
                      toggleProMutation.mutate(template.id)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Image
                    src={template.thumbnail || ""}
                    alt={template.name}
                    width={200}
                    height={200}
                    className="w-full h-16 object-cover"
                  />
                </TableCell>
                <TableCell>{template.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>{template.updatedAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  <Switch
                    checked={template.isPublished}
                    onCheckedChange={() =>
                      togglePublishMutation.mutate(template.id)
                    }
                  />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="w-auto">
                        <EllipsisVerticalIcon className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link
                          href={`/dashboard/templates/view-template?slug=${template.slug}`}
                          className="flex items-center gap-2 w-full"
                        >
                          <EyeIcon className="w-4 h-4" />
                          Preview
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href={`/dashboard/templates/edit-template?slug=${template.slug}`}
                          className="flex items-center gap-2"
                        >
                          <PencilIcon className="w-4 h-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          deleteTemplateMutation.mutate(template.id)
                        }
                        disabled={deleteTemplateMutation.isPending}
                        className="flex items-center gap-2"
                      >
                        <DeleteIcon className="w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardWrapper>
  );
}

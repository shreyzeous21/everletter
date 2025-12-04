import {
  createTemplate,
  deleteTemplate,
  getAllTemplates,
  togglePro,
  togglePublish,
  updateTemplate,
} from "@/actions/template-action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useTemplate = () => {
  const queryClient = useQueryClient();

  const createTemplateMutation = useMutation({
    mutationFn: async (data: {
      name: string;
      slug: string;
      thumbnail?: string;
      category?: string;
      html: string;
      proOnly?: boolean;
      isPublished?: boolean;
      variables?: Record<string, any>;
    }) => createTemplate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success("Template created successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.message || "Failed to create template. Please try again later."
      );
    },
  });

  const getAllTemplatesQuery = useQuery({
    queryKey: ["templates"],
    queryFn: async () => await getAllTemplates(),
  });

  const deleteTemplateMutation = useMutation({
    mutationFn: async (id: string) => await deleteTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success("Template deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.message || "Failed to delete template. Please try again later."
      );
    },
  });

  const updateTemplateMutation = useMutation({
    mutationFn: async (data: {
      id: string;
      name: string;
      thumbnail?: string;
      category?: string;
      html: string;
      slug: string;
      proOnly?: boolean;
      isPublished?: boolean;
      variables?: Record<string, any>;
    }) => updateTemplate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success("Template updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.message || "Failed to update template. Please try again later."
      );
    },
  });

  const toggleProMutation = useMutation({
    mutationFn: async (id: string) => await togglePro(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success("Template pro status updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update template pro status.");
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: async (id: string) => await togglePublish(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success("Template publish status updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update template publish status.");
    },
  });

  return {
    createTemplateMutation,
    getAllTemplatesQuery,
    deleteTemplateMutation,
    updateTemplateMutation,
    toggleProMutation,
    togglePublishMutation,
  };
};

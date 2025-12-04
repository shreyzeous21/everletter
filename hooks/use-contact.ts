import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContact,
  deleteContact,
  getAllContacts,
} from "@/actions/contact-action";
import { toast } from "sonner";

export const useContact = () => {
  const queryClient = useQueryClient();
  const createContactMutation = useMutation({
    mutationKey: ["create-contact"],
    mutationFn: async (data: {
      name: string;
      email: string;
      country: string;
      message: string;
    }) => {
      return await createContact(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Message sent successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.message || "Failed to send message. Please try again later."
      );
    },
  });

  const getAllContactsQuery = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      return await getAllContacts();
    },
  });

  const deleteContactMutation = useMutation({
    mutationKey: ["delete-contact"],
    mutationFn: async (id: string) => {
      return await deleteContact(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contact deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return { createContactMutation, getAllContactsQuery, deleteContactMutation };
};

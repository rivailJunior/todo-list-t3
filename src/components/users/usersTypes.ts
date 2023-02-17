import { Users } from "@prisma/client";
import * as z from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Minimum characters is 5" })
    .max(30, { message: "Maximum characters is 30" }),
  id: z.string().min(1, { message: "Id is necessary" }),
});

export interface FormSchema {
  create: Pick<z.infer<typeof formSchema>, "name">;
  update: z.infer<typeof formSchema>;
}

export interface IListUsers {
  data: Users[] | undefined;
  isLoading: boolean;
}

export interface IInputUser {
  mutateAdd: (data: FormSchema["create"]) => void;
  mutateUpdate: (data: FormSchema["update"]) => void;
  isLoading: boolean;
}

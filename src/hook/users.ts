import { Users } from "@prisma/client";
import { useContext } from "react";
import { ListContext } from "../context/listContext";
import { trpc } from "../utils/trpc";

export default function useUser() {
  const { setOpen, open, setUser, user } = useContext(ListContext);
  const ctx = trpc.useContext();
  const { mutate: mutateDelete } = trpc.users.removeUser.useMutation({
    onSuccess: () => {
      ctx.invalidate();
      setUser(null);
    },
  });

  const handleDeleteUser = () => {
    mutateDelete({ id: user?.id as any });
    setOpen(false);
  };

  const handleOnDeleteUser = (user: Users) => {
    setUser(user);
    setOpen(true);
  };

  return {
    handleDeleteUser,
    handleOnDeleteUser,
    setOpen,
    open,
    setUser,
    user,
  };
}

import React, { useContext } from "react";
import { Modal } from "../components/shared";
import { InputUser, ListUsers } from "../components/users";

import { ListContext } from "../context/listContext";

import { trpc } from "../utils/trpc";

export default function Main() {
  const { data } = trpc.users.getAll.useQuery();
  const ctx = trpc.useContext();
  const { mutate } = trpc.users.removeUser.useMutation({
    onSuccess: () => ctx.invalidate(),
  });
  const { open, setOpen, user } = useContext(ListContext);

  const handleDeleteUser = () => {
    mutate({ id: user?.id as any });
    setOpen(false);
  };
  return (
    <>
      <InputUser />
      <ListUsers data={data} />
      <Modal
        setOpen={() => setOpen(false)}
        open={open}
        title={`Exluindo Usuário`}
        subTitle={`Voce tem certeza que deseja excluir user: ${user?.name.toUpperCase()}?`}
        actionButton={handleDeleteUser}
      />
    </>
  );
}

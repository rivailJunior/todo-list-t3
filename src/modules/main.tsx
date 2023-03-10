import React from "react";
import { InputUser, ListUsers } from "../components/users";

import { trpc } from "../utils/trpc";

export default function Main() {
  const { data } = trpc.users.getAll.useQuery();
  const ctx = trpc.useContext();
  const { mutate: mutateAdd, isLoading: isLoadingCreate } =
    trpc.users.addNewUser.useMutation({
      onSuccess: () => ctx.invalidate(),
    });
  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } =
    trpc.users.updateUser.useMutation({
      onSuccess: () => ctx.invalidate(),
    });

  return (
    <>
      <InputUser
        isLoading={isLoadingCreate || isLoadingUpdate}
        mutateAdd={mutateAdd}
        mutateUpdate={mutateUpdate}
      />
      <ListUsers isLoading={isLoadingCreate || isLoadingUpdate} data={data} />
    </>
  );
}

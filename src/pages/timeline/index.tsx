import { NextPage } from "next";
import React from "react";
import { TimeLine } from "../../components/timeLineUsers";
import { InputUser } from "../../components/users";
import { trpc } from "../../utils/trpc";

const main: NextPage = (props) => {
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
      <TimeLine users={data} />
    </>
  );
};
export default main;

import React from "react";
import { InputUser, ListUsers } from "../components/users";

import { trpc } from "../utils/trpc";

export default function Main() {
  const { data } = trpc.users.getAll.useQuery();

  return (
    <>
      <InputUser />
      <ListUsers data={data} />
    </>
  );
}

/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import { Users } from "@prisma/client";
import React, { useState } from "react";

type TListContext = {
  open: boolean;
  setOpen: Function;
  user: Users | null;
  setUser: Function;
};

export const ListContext = React.createContext<TListContext>({
  open: false,
  setOpen: () => {},
  user: null,
  setUser: () => {},
});

export default function ListProvider({ children }: React.PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  return (
    <ListContext.Provider
      value={{
        open,
        setOpen,
        setUser,
        user,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}

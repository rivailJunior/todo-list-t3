import React, { useContext, useState, useEffect } from "react";
import { ListContext } from "../../context/listContext";
import { trpc } from "../../utils/trpc";

const PRIMARY_BUTTON =
  "bg-blue-500 bottom-0 right-0 mt-2 inline-flex w-1/4 justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-400";
const DISABLED_BUTTON =
  "bg-gray-200 bottom-0 right-0 mt-2 inline-flex w-1/4 justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-100 text-black";

export function InputUser() {
  const [name, setName] = useState("");
  const { user } = useContext(ListContext);
  const ctx = trpc.useContext();

  const { mutate: mutateAdd, isLoading: isLoadingCreate } =
    trpc.users.addNewUser.useMutation({
      onSuccess: () => ctx.invalidate(),
    });

  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } =
    trpc.users.updateUser.useMutation({
      onSuccess: () => ctx.invalidate(),
    });

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleCreateUser = (evt: any) => {
    evt.preventDefault();
    try {
      if (!name.length) throw "Type value";
      mutateAdd({ name: name.toUpperCase() });
    } catch (error) {
      console.log("error create", error);
    } finally {
      setName("");
    }
  };

  const handleUpdateUser = (evt: any) => {
    evt.preventDefault();
    try {
      if (!name.length) throw "Type value";
      mutateUpdate({ id: user?.id as any, name: name.toUpperCase() });
    } catch (error) {
      console.log("error update", error);
    } finally {
      setName("");
    }
  };

  return (
    <div className="relative mt-10 flex h-28 min-w-full flex-col">
      <div className="flex flex-col justify-start">
        <label
          htmlFor="inputUser"
          className="mb-2 font-mono text-lg font-thin uppercase text-gray-600"
        >
          User Name
        </label>
        <input
          id="inputUser"
          type="text"
          onChange={(evt) => {
            setName(evt.target.value);
          }}
          value={name}
          placeholder="Your Name"
          className="relative block w-full appearance-none rounded-sm border border-stone-400 p-2 text-lg uppercase text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
        />
        <div className="flex justify-end">
          <button
            disabled={isLoadingCreate || isLoadingUpdate}
            onClick={user ? handleUpdateUser : handleCreateUser}
            type="submit"
            className={
              isLoadingCreate || isLoadingUpdate
                ? DISABLED_BUTTON
                : PRIMARY_BUTTON
            }
          >
            {user ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

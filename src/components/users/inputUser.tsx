import React, { useContext, useState, useEffect } from "react";
import { ListContext } from "../../context/listContext";
import { trpc } from "../../utils/trpc";

export function InputUser() {
  const [name, setName] = useState("");
  const { user } = useContext(ListContext);
  const ctx = trpc.useContext();
  const { mutate, isLoading } = trpc.users.addNewUser.useMutation({
    onSuccess: () => ctx.invalidate(),
  });

  const { mutate: mutateUpdate } = trpc.users.updateUser.useMutation({
    onSuccess: () => ctx.invalidate(),
  });

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleCreateUser = (evt: any) => {
    console.log("will create");
    evt.preventDefault();
    try {
      if (!name.length) throw "Type value";
      mutate({ name: name.toUpperCase() });
    } catch (error) {
      console.log("error create", error);
    } finally {
      setName("");
    }
  };

  const handleUpdateUser = (evt: any) => {
    console.log("will update");
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
            disabled={isLoading}
            onClick={user ? handleUpdateUser : handleCreateUser}
            type="submit"
            className="bottom-0 right-0 mt-2 inline-flex w-1/4 justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {user ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

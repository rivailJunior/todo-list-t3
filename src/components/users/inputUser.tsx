import React, { useContext, useEffect } from "react";
import { ListContext } from "../../context/listContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormSchema, IInputUser } from "./usersTypes";

const PRIMARY_BUTTON =
  "bg-blue-500 bottom-0 right-0 mt-2 inline-flex w-1/4 justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-400";
const DISABLED_BUTTON =
  "bg-gray-200 bottom-0 right-0 mt-2 inline-flex w-1/4 justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-100 text-black";

export function InputUser({ mutateAdd, mutateUpdate, isLoading }: IInputUser) {
  const {
    handleSubmit,
    register,
    reset: resetForm,
    setValue,
    formState: { errors },
  } = useForm<FormSchema["create"]>({
    resolver: zodResolver(formSchema.pick({ name: true })),
  });

  const { user, setUser } = useContext(ListContext);

  useEffect(() => {
    if (user?.name.length) {
      setValue("name", user.name);
    }
  }, [user]);

  const handleCreateUser = (data: FormSchema["create"]) => {
    try {
      mutateAdd({ name: data.name });
    } catch (error) {
      console.error("error on create", error);
    } finally {
      resetForm();
      setUser(null);
    }
  };

  const handleUpdateUser = (data: FormSchema["create"]) => {
    try {
      mutateUpdate({ id: user?.id as string, name: data.name });
    } catch (error) {
      console.error("error on update", error);
    } finally {
      resetForm();
      setUser(null);
    }
  };

  const onHandleSubmit = (data: FormSchema["create"]) => {
    console.log("handle update");
    user ? handleUpdateUser(data) : handleCreateUser(data);
  };

  return (
    <div className="relative my-2 mt-10 flex h-28 min-w-full flex-col">
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="flex flex-col justify-start">
          <label
            htmlFor="inputUser"
            className="mb-2 text-lg font-light capitalize text-gray-600"
          >
            Name
          </label>
          <input
            id="inputUser"
            type="text"
            {...register("name")}
            placeholder="Type your name here"
            className="block w-full rounded-lg border border-stone-400 p-2 text-lg font-light capitalize text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
          />
          {errors.name?.message && (
            <p className="mt-1 rounded-md bg-red-400 p-1 text-sm font-light capitalize text-white">
              {errors.name?.message as string}
            </p>
          )}
          <div className="flex justify-end ">
            <button
              disabled={isLoading}
              type="submit"
              className={isLoading ? DISABLED_BUTTON : PRIMARY_BUTTON}
            >
              {user ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

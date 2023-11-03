import { Users } from "@prisma/client";
import React from "react";
import { MdOutlinePersonRemove } from "react-icons/md";
import daysHelper from "../../helper/daysHelper";
import useUser from "../../hook/users";

export default function TimeLine({ users }: { users: Users[] | undefined }) {
  const { setUser, handleOnDeleteUser } = useUser();
  return (
    <div className="mt-5">
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        {users?.map((user: Users) => {
          return (
            <li className="mb-10 ml-6" key={`${user.updatedAt}`}>
              <span
                onClick={() => handleOnDeleteUser(user)}
                className="absolute -left-3 mt-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-400  text-white ring-4 ring-white"
              >
                <MdOutlinePersonRemove />
              </span>
              <div className="items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 sm:flex">
                <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                  {daysHelper(user.updatedAt).from(new Date())}
                </time>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
                  <a
                    href="#"
                    onClick={() => setUser(user)}
                    className="font-semibold text-blue-600 hover:underline dark:text-blue-500"
                  >
                    {user.name}
                  </a>{" "}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

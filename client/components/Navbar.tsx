import React from "react";
import { JwtPayloadType } from "../types";
import { UserIcon } from "@heroicons/react/solid";
import { useMutation } from "@apollo/client";
import { SIGNOUT } from "../graphql/mutation/signout";
import { useRouter } from "next/router";

interface Props {
  user: JwtPayloadType;
}

const Navbar: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const [signOutUser] = useMutation<{ signOut: boolean }>(SIGNOUT);
  const signOutHandler = async () => {
    try {
      const signOutResponse = await signOutUser();
      if (signOutResponse.data) {
        if (signOutResponse.data.signOut) {
          router.replace("/auth/Login");
        } else {
        }
      }
    } catch (error) {}
  };
  return (
    <div className="w-full h-20 bg-slate-900 flex flex-row items-center justify-between p-4">
      <p className="text-2xl">DSA - Tracker</p>
      <div className="flex items-center justify-between w-2/3 sm:w-1/2 md:w-1/2 lg:w-2/5">
        <p className="cursor-pointer hover:text-purple hover:border-b-2 hover:border-purple ease-linear duration-100">
          All
        </p>
        <p className="cursor-pointer hover:text-purple hover:border-b-2 hover:border-purple ease-linear duration-100">
          Favorites
        </p>
        <p className="cursor-pointer hover:text-purple hover:border-b-2 hover:border-purple ease-linear duration-100">
          Todo
        </p>
        <div
          onClick={signOutHandler}
          className="flex flex-col items-center justify-center rounded-md border-2 text-purple border-purple cursor-pointer hover:bg-purple hover:text-white ease-linear duration-200"
        >
          <div className="mx-3 flex items-center justify-between gap-2">
            <UserIcon className="w-5 h-5" />
            <p className="text-lg">
              {user.name.length > 8 ? user.name.split(" ")[0] : user.name}
            </p>
          </div>
          <p className="text-xs mb-1">Sign Out</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

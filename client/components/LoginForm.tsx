import Link from "next/link";
import React from "react";
import { UserLoginInputType } from "../types";
import InputField from "./InputField";

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  state: {
    data: UserLoginInputType;
    setData: React.Dispatch<React.SetStateAction<UserLoginInputType>>;
  };
}

const LoginForm: React.FC<Props> = ({ onSubmit, state }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="h-full flex flex-col items-center
      justify-evenly"
    >
      <InputField state={state} title={"Email"} />
      <div>
        <InputField state={state} title={"Password"} />
        <p className="text-sm text-right text-purple mt-2 cursor-pointer">
          Forgot Password?
        </p>
      </div>
      <button
        type="submit"
        className="w-full h-7 bg-purple text-white rounded-sm mt-4"
      >
        Log In
      </button>
      <p className="text-sm mt-2">
        Don't have an account?{" "}
        <Link href={"/auth/Signup"}>
          <span className="text-purple cursor-pointer">Sign Up</span>
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;

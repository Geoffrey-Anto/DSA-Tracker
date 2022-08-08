import Link from "next/link";
import React from "react";
import { UserSignUpInputType } from "../types";
import InputField from "./InputField";

interface Props {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  state: {
    data: UserSignUpInputType;
    setData: React.Dispatch<React.SetStateAction<UserSignUpInputType>>;
  };
}

const SignUpForm: React.FC<Props> = ({ onSubmit, state }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="h-full flex flex-col items-center
      justify-evenly"
    >
      <div className="w-full flex flex-row justify-between">
        <InputField state={state} isSmall={true} title={"First Name"} />
        <InputField state={state} isSmall={true} title={"Last Name"} />
      </div>
      <InputField state={state} title={"Email"} />
      <InputField state={state} title={"Password"} />
      <button
        type="submit"
        className="w-full h-7 bg-purple text-white rounded-sm mt-4"
      >
        Sign Up
      </button>
      <p className="text-sm mt-2">
        Have an account?{" "}
        <Link href={"/auth/Login"}>
          <span className="text-purple cursor-pointer">Sign In</span>
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;

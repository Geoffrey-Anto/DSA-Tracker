import React from "react";
import SignUpForm from "../../components/SignUpForm";
import { UserSignUpInputType } from "../../types";

const SignUp = () => {
  const [data, setData] = React.useState<UserSignUpInputType>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <div className="bg-gray-800  text-white flex h-screen flex-1 flex-col items-center justify-around font-sans">
      <div className="w-full h-3/4 flex flex-col items-center justify-evenly">
        <p className="text-2xl">Start solving with Dsa-Tracker</p>
        <p className="text-sm text-gray-400 pt-4">
          Create an account to start tracking questions!
        </p>
        <SignUpForm state={{ data, setData }} onSubmit={onFormSubmit} />
      </div>
    </div>
  );
};

export default SignUp;

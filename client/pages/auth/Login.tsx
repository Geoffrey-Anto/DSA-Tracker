import React from "react";
import LoginForm from "../../components/LoginForm";
import { UserLoginInputType } from "../../types";

const Login = () => {
  const [data, setData] = React.useState<UserLoginInputType>({
    email: "",
    password: "",
  });

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div className="bg-gray-800  text-white flex h-screen flex-1 flex-col items-center justify-around font-sans">
      <div className="w-full h-2/3 flex flex-col items-center justify-evenly">
        <p className="text-2xl">Log In to Dsa-Tracker</p>
        <p className="text-sm text-gray-400 pt-4">
          Welcome back! Please enter your details.
        </p>
        <LoginForm state={{ data, setData }} onSubmit={onFormSubmit} />
      </div>
    </div>
  );
};

export default Login;

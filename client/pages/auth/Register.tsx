import { useMutation } from "@apollo/client";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import SignUpForm from "../../components/SignUpForm";
import { REGISTER } from "../../graphql/mutation/register";
import {
  JwtPayloadType,
  RegisterMutationResponse,
  SignUpMutationInputType,
  UserSignUpInputType,
} from "../../types";
import { getFullName } from "../../utils/getFullName";
import jwt from "jsonwebtoken";
import { GetServerSideProps } from "next";
import Head from "next/head";

const SignUp = () => {
  const [registerUser] = useMutation(REGISTER);

  const [data, setData] = React.useState<UserSignUpInputType>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const onSuccessHandler = () => {
    window.location.replace("/");
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const SignUpFormData: SignUpMutationInputType = {
      email: data.email,
      name: getFullName(data.first_name, data.last_name),
      password: data.password,
    };
    try {
      const registerUserInput = (await registerUser({
        variables: SignUpFormData,
      })) as RegisterMutationResponse;
      if (
        registerUserInput.data &&
        registerUserInput.data.register &&
        registerUserInput.data.register.data
      ) {
        setData({
          email: "",
          password: "",
          first_name: "",
          last_name: "",
        });
        onSuccessHandler();
      } else if (
        registerUserInput.data &&
        registerUserInput.data.register.message
      ) {
        const message = registerUserInput.data.register.message;
        toast.error(message, {
          position: "top-center",
          duration: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>DSA-Tracker</title>
      </Head>
      <Toaster />
      <div className="bg-gray-800  text-white flex h-screen flex-1 flex-col items-center justify-around font-sans">
        <div className="w-full h-3/4 flex flex-col items-center justify-evenly">
          <p className="text-2xl">Start solving with Dsa-Tracker</p>
          <p className="text-sm text-gray-400 pt-4">
            Create an account to start tracking questions!
          </p>
          <SignUpForm state={{ data, setData }} onSubmit={onFormSubmit} />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["access-token"];
  if (!token) {
    return {
      props: {},
    };
  }
  try {
    const jwtResponse = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayloadType;
    if (jwtResponse.id !== undefined) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
        props: {},
      };
    }
  } catch (error) {
    return {
      props: {},
    };
  }
  return {
    props: {},
  };
};

export default SignUp;

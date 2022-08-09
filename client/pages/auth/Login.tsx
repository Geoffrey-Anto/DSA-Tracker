import { GetServerSideProps, NextPage } from "next";
import React, { useEffect } from "react";
import LoginForm from "../../components/LoginForm";
import { LoginMutationResponse, UserLoginInputType } from "../../types";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/mutation/login";

interface Props {
  message?: string;
}

const Login: NextPage<Props> = ({ message }) => {
  // const router = useRouter();
  const [loginUser] = useMutation<UserLoginInputType>(LOGIN);

  const [data, setData] = React.useState<UserLoginInputType>({
    email: "",
    password: "",
  });

  const onLoginSuccessHandler = () => {
    window.location.replace("/");
    return;
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data: loginResponse } = (await loginUser({
        variables: data,
      })) as LoginMutationResponse;
      if (loginResponse) {
        if (loginResponse.login.message === null && loginResponse.login.data) {
          setData({
            email: "",
            password: "",
          });
          onLoginSuccessHandler();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (message) {
      toast.error(message, {
        duration: 1500,
        style: {
          fontSize: 15,
        },
      });
    }
  }, [message]);

  return (
    <>
      <Toaster />
      <div className="bg-gray-800  text-white flex h-screen flex-1 flex-col items-center justify-around font-sans">
        <div className="w-full h-2/3 flex flex-col items-center justify-evenly">
          <p className="text-2xl">Log In to Dsa-Tracker</p>
          <p className="text-sm text-gray-400 pt-4">
            Welcome back! Please enter your details.
          </p>
          <LoginForm state={{ data, setData }} onSubmit={onFormSubmit} />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const q = context.query;
  if (q.session === "expired") {
    return {
      props: {
        message: "Session has expired. Please login again",
      },
    };
  }
  return {
    props: {},
  };
};

export default Login;

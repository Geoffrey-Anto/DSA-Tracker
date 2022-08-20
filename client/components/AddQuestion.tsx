import { ArrowLeftIcon } from "@heroicons/react/solid";
import React from "react";

const AddQuestion = () => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    console.log(data);
  };
  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-1 flex-col items-center justify-evenly bg-gray-900"
    >
      <ArrowLeftIcon className="w-6 h-6 absolute z-40 left-2 top-2 cursor-pointer" />
      <p className="text-xl font-semibold">Add Question</p>
      <input
        className="h-8 p-3 border-none active:border-none w-[60%] text-black"
        placeholder="Enter The Title"
      />
      <input
        className="h-8 p-3 border-none active:border-none w-[60%] text-black"
        placeholder="Enter The Tags"
      />
      <input
        className="h-8 p-3 border-none active:border-none w-[60%] text-black"
        placeholder="Enter The Link "
      />
      <button
        type="submit"
        className="rounded-md border-2 text-purple border-purple cursor-pointer hover:bg-purple hover:text-white ease-linear duration-200 px-3 py-1"
      >
        Submit
      </button>
    </form>
  );
};

export default AddQuestion;

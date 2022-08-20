import React from "react";

interface Props {
  title: String;
  isSmall?: Boolean;
  state: {
    data: any;
    setData: React.Dispatch<React.SetStateAction<any>>;
  };
}

const InputField: React.FC<Props> = ({ title, isSmall, state }) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      title.toLowerCase() === "first name" ||
      title.toLowerCase() === "last name"
    ) {
      const key =
        title.toLowerCase() === "first name" ? "first_name" : "last_name";
      state.setData({
        ...state.data,
        [key]: e.target.value,
      });
      return;
    }
    state.setData({
      ...state.data,
      [title.toLowerCase()]: e.target.value,
    });
  };

  if (isSmall) {
    return (
      <div className="flex items-start justify-center flex-col">
        <p className="text-xs mb-1 mt-2">{title}</p>
        <input
          value={state.data[title.replace(" ", "_").toLowerCase()]}
          required={title === "First Name" ? true : false}
          type="text"
          placeholder={`Enter your ${title.toLowerCase()}`}
          className="text-gray-800 text-sm w-28 lg:w-36 xl:w-44 p-2 border-gray-300 border-2 rounded-md"
          onChange={onChangeHandler}
        />
      </div>
    );
  }
  return (
    <div className="flex items-start justify-center flex-col">
      <p className="text-xs mb-1 mt-2">{title}</p>
      <input
        value={state.data[title.toLowerCase()]}
        required
        type={title === "Password" ? "password" : "text"}
        placeholder={`Enter your ${title.toLowerCase()}`}
        className="text-gray-800 text-sm w-60 lg:w-80 xl:w-96 p-2 border-gray-300 border-2 rounded-md"
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default InputField;

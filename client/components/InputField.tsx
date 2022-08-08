import React from "react";

interface Props {
  title: String;
  isSmall?: Boolean;
  state: any;
}

const InputField: React.FC<Props> = ({ title, isSmall, state }) => {
  if (isSmall) {
    return (
      <div className="flex items-start justify-center flex-col">
        <p className="text-xs mb-1 mt-2">{title}</p>
        <input
          type="text"
          placeholder={`Enter your ${title.toLowerCase()}`}
          className="text-gray-800 text-sm w-28 lg:w-36 xl:w-44 p-2 border-gray-300 border-2 rounded-md"
          onChange={(e) => {
            if (
              title.toLowerCase() === "first name" ||
              title.toLowerCase() === "last name"
            ) {
              const key =
                title.toLowerCase() === "first name"
                  ? "first_name"
                  : "last_name";
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
          }}
        />
      </div>
    );
  }
  return (
    <div className="flex items-start justify-center flex-col">
      <p className="text-xs mb-1 mt-2">{title}</p>
      <input
        type="text"
        placeholder={`Enter your ${title.toLowerCase()}`}
        className="text-gray-800 text-sm w-60 lg:w-80 xl:w-96 p-2 border-gray-300 border-2 rounded-md"
        onChange={(e) => {
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
        }}
      />
    </div>
  );
};

export default InputField;

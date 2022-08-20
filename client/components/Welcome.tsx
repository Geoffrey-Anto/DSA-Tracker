import React from "react";

interface Props {
  name: string;
  stats: {
    All: number;
    Todo: number;
    Favs: number;
  };
}

const Welcome: React.FC<Props> = ({ name, stats }) => {
  return (
    <div className="w-1/2 flex flex-col items-start h-full">
      <p className="text-2xl m-4">Welcome {name}!</p>
      <div className="text-md m-4 mt-0 text-[#8f6fe4]">
        <p>All Questions: {stats.All}</p>
        <p>Todo Questions: {stats.Todo}</p>
        <p>Favorite Questions: {stats.Favs}</p>
      </div>
    </div>
  );
};

export default Welcome;

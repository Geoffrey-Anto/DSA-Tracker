import React from "react";

interface Props {
  name: string;
}

const Welcome: React.FC<Props> = ({ name }) => {
  return (
    <div className="">
      <p className="text-2xl m-4">Welcome {name}!</p>
    </div>
  );
};

export default Welcome;

import React from "react";

interface Props {
  title: string;
}

const VisitButton: React.FC<Props> = ({ title }) => {
  return (
    <div className="bg-purple p-1">
      <a className="w-full h-full cursor-pointer" href={title}>
        <p>Open</p>
      </a>
    </div>
  );
};

export default VisitButton;

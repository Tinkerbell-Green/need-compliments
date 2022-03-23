import React from "react";
import * as S from "./subHeadingButton.styled";

type SubHeadingButtonPros = {
  children: React.ReactNode;
<<<<<<< HEAD
  onClick: () => void;
};

export const SubHeadingButton = ({children, onClick}: SubHeadingButtonPros) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <S.SubHeadingButton onClick={handleClick}>{children}</S.SubHeadingButton>
  );
};
=======
  status?: "error" | "default";
};

export const SubHeadingButton = ({
  children,
  status = "default",
}: SubHeadingButtonPros) => (
  <S.SubHeadingButton status={status}>{children}</S.SubHeadingButton>
);
>>>>>>> 3f2ed7486942e80b560e0a3667039ed321b3ecd6

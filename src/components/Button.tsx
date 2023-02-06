import { ButtonHTMLAttributes } from "react";

import { Button } from "react-daisyui";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
  label: string;
  icon?: JSX.Element;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function Btn({
  id,
  label,
  className,
  disabled,
  icon,
  onClick,
}: ButtonProps) {
  return (
    <Button
      id={id}
      className={`bg-btn text-white hover:bg-btnh border-none rounded-full w-full disabled:bg-btnh disabled:text-gray-200 ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label} {icon}
    </Button>
  );
}

export function Btns({
  id,
  label,
  className,
  disabled,
  icon,
  onClick,
}: ButtonProps) {
  return (
    <Button
      id={id}
      className={`bg-btns text-white hover:bg-btnsh border-none rounded-full w-full ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label} {icon}
    </Button>
  );
}

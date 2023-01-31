import { ButtonHTMLAttributes } from "react";

import { Button } from "react-daisyui";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: JSX.Element;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function Btn({
  label,
  className,
  disabled,
  icon,
}: ButtonProps) {
  return (
    <Button
      className={`bg-btn text-white hover:bg-btnh border-none rounded-full w-full disabled:bg-btnh disabled:text-gray-200 ${className}`}
      disabled={disabled}
    >
      {label} {icon}
    </Button>
  );
}

export function Btns({
  label,
  className,
  disabled,
  icon,
  onClick,
}: ButtonProps) {
  return (
    <Button
      className={`bg-btns text-white hover:bg-btnsh border-none rounded-full w-full ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label} {icon}
    </Button>
  );
}

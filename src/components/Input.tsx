import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

function Input({ id, ...props }: Props) {
  return (
    <input
      id={id}
      className="bg-[#D8D8DD] rounded-lg text-black p-2 border focus:outline-none focus:border-black"
      {...props}
    />
  );
}

export default Input;

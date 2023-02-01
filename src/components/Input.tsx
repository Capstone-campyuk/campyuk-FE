import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  title: string;
}

export function Input({ id, title, ...props }: Props) {
  return (
    <div className="my-3">
      <p className="my-1 font-bold text-lg">{title}</p>
      <input
        id={id}
        className="bg-form w-full rounded-lg text-black p-3 border focus:outline-none focus:border-black"
        {...props}
      />
    </div>
  );
}

import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  className?: string;
  id?: string;
}

export function Input({ title, ...props }: Props) {
  return (
    <div className="my-3">
      <p className="my-1 font-bold text-lg">{title}</p>
      <input
        className="bg-form w-full rounded-lg text-black p-3 border focus:outline-none focus:border-black"
        {...props}
      />
    </div>
  );
}

export function InputSolo({ className, ...props }: Props) {
  return (
    <input
      className={`bg-form w-full rounded-lg text-black p-3 border focus:outline-none focus:border-black ${className}`}
      {...props}
    />
  );
}

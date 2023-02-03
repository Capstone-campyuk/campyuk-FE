import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  className?: string;
}

export function Input({ id, title, ...props }: Props) {
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

export function InputSolo({ id, className, ...props }: Props) {
  return (
    <input
      className={`bg-form w-full rounded-lg text-black p-3 border focus:outline-none focus:border-black ${className}`}
      {...props}
    />
  );
}

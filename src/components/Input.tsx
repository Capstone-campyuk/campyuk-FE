import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  className?: string;
}

export function Input({ title, ...props }: Props) {
  return (
    <div className="my-3">
      <label className="my-1 font-bold text-lg">{title}</label>
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

export function InputSide({ title, className, ...props }: Props) {
  return (
    <div className="flex items-center w-full px-10">
      <label className="text-black font-bold flex items-start w-1/3">
        {title}
      </label>
      <input
        className={`rounded-lg bg-form px-2 p-2 border-2 focus:outline-none text-black w-full ${className}`}
        placeholder={title}
        {...props}
      />
    </div>
  );
}

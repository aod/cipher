import { PropsWithChildren } from "react";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button(props: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className="text-xs lg:text-base text-white border px-5 py-2 lg:py-3 lg:px-7 rounded-xl font-semibold tracking-wide focus:bg-white focus:text-black focus:border-black focus:outline-white focus:outline outline-2 w-48 lg:w-64 h-10 lg:h-12"
      onClick={() => props.onClick?.()}
      disabled={props?.disabled}
    >
      {props.children}
    </button>
  );
}

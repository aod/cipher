import clsx from "clsx";
import Link from "next/link";
import { PropsWithChildren, Fragment } from "react";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  position?: "left" | "middle" | "right";
  resize?: boolean;
  href?: string;
  submit?: boolean;
}

export default function Button(props: PropsWithChildren<ButtonProps>) {
  const Wrapper = props.href ? Link : Fragment;
  const Btn = props.href ? "a" : "button";

  const wrapperArgs = props.href ? { href: props.href } : {};
  const btnArgs = props.href
    ? {}
    : {
        onClick: props.onClick,
        disabled: props.disabled,
        // TODO: Remove typecasting, errors without it
        type: (props.submit ? "submit" : "button") as
          | "button"
          | "submit"
          | "reset",
      };

  return (
    <Wrapper {...wrapperArgs}>
      <Btn
        className={clsx(
          "group bg-black text-xs lg:text-base text-white border-2 border-[#999] px-5 py-2 lg:py-3 lg:px-7 rounded-full font-semibold tracking-wide focus:bg-white focus:text-black focus:border-black outline-2 focus:outline focus:outline-white h-10 lg:h-12 flex justify-center items-center cursor-pointer focus:z-10",
          props.position === "left" &&
            "rounded-r-none pr-2.5 lg:pr-6 relative -right-px focus:right-px",
          props.position === "right" &&
            "rounded-l-none pl-2.5 lg:pl-6 relative focus:left-px",
          !props.resize && "w-32 lg:w-48"
        )}
        {...btnArgs}
      >
        <div
          className={clsx(
            props.position === "left" &&
              "group-focus:relative group-focus:-right-[2px]",
            props.position === "right" &&
              "group-focus:relative group-focus:-left-px"
          )}
        >
          {props.children}
        </div>
      </Btn>
    </Wrapper>
  );
}

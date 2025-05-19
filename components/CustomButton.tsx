"use client";
import Image from "next/image";

import { CustomButtonProps } from "@/types";

export const CustomButton = ({
  title,
  containerStyles,
  textStyles,
  handleClick,
  btnType = "button",
  rightIcon,
  isDisabled,
}: CustomButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      type={btnType}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="relative h-6 w-6">
          <Image
            src={rightIcon}
            alt="right-icon"
            fill
            className="object-contain"
          />
        </div>
      )}
    </button>
  );
};

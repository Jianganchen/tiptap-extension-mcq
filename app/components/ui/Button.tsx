import { ButtonHTMLAttributes } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ElementType;
  active?: boolean;
}

const Button = ({ icon: Icon, active, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full transition-all",
        active
          ? "text-buttonColor hover:text-yellow-500"
          : "text-textColor hover:text-d1d0c5",
        props.disabled ? "opacity-50 cursor-not-allowed" : "",
        className
      )}
      {...props}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
};

export default Button;

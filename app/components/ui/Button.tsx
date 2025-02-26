import { ButtonHTMLAttributes } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ElementType;
  tooltip: string;
  active?: boolean;
}

const ToolButton = ({
  icon: Icon,
  tooltip,
  active,
  className,
  ...props
}: ButtonProps) => {
  const buttonClassName = cn(
    "bg-gray-300 text-white hover:bg-gray-400",
    active
      ? "bg-blue-600 text-white hover:bg-blue-500 shadow-md"
      : "text-gray-800 hover:text-gray-900",
    props.disabled ? "opacity-50 cursor-not-allowed" : "",
    className
  );
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" className={buttonClassName} {...props}>
            <Icon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolButton;

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
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              active
                ? "text-buttonColor hover:text-yellow-500"
                : "text-textColor hover:text-d1d0c5",
              props.disabled ? "opacity-50 cursor-not-allowed" : "",
              className
            )}
            {...props}
          >
            <Icon className="w-6 h-6" />
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
